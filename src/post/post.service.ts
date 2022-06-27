import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model, ObjectId } from 'mongoose';
import { PostCreateCommand } from './model';

@Injectable()
export class PostService {


    constructor(
    @InjectModel(Post.name) private readonly postSchemaModel: Model<PostDocument>
    ) {
    }

    async findAll(): Promise<PostDocument[]> {
        return this.postSchemaModel.find();
    }

    async findOne(_id: string): Promise<PostDocument> {
        return this.postSchemaModel.findById(_id);
    }

    async create(post: PostCreateCommand) {
        const postSchemaModel = new this.postSchemaModel(post);
        const createdPost = await postSchemaModel.save();
        return createdPost;
    }

}