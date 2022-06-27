import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateCommand } from './model';

@Controller('posts')
export class PostController {

    constructor(
    private readonly postService: PostService
    ) {
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':_id')
    findOne(@Param() _id: string) {
        return this.postService.findOne(_id);
    }

    @Post()
    create(@Body() comment: PostCreateCommand) {
        return this.postService.create(comment);
    }
}
