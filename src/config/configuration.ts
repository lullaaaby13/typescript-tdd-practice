import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = `${process.env.NODE_ENV || 'development'}.yaml`;
const PATH = process.env.NODE_ENV !== 'test' ? __dirname : join(__dirname, '../../config');
const K8S_PROP_REGEXP = /\${\w+}/;

export default () => {

    let content: string = readFileSync(join(PATH, YAML_CONFIG_FILENAME), 'utf8');
    let matchResult = null;

    do {
        matchResult = content.match(K8S_PROP_REGEXP);
        if (matchResult) {
            const matchString = matchResult[0];
            const { index, input } = matchResult;
            const property = matchString.substring(2, matchString.length - 1);
            const systemProperty = process.env[property];
            if (systemProperty) {
                content = input.replace(matchString, `${isNumber(systemProperty) ? systemProperty : `'${systemProperty}'`}`);
            } else {
                throw new Error(`시스템 환경 변수를 찾을 수 없습니다. [속성값 = ${property}]`);
            }
        }
    } while (matchResult);

    return yaml.load(content) as Record<string, any>;
};

function isNumber(target: any) {
    const isNotNumber = isNaN(Number(target)); // true: 숫자아님, false: 숫자임
    return !isNotNumber;
}