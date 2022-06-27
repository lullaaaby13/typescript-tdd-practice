import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

@Schema({ _id: true, timestamps: true })
export class Post {

   @Prop()
       title: string;

   @Prop()
       content: string;

    @Prop()
        viewCount: number;

  @Prop()
      writer: number;

  constructor(title: string, content: string, viewCount: number, writer: number) {
      this.title = title;
      this.content = content;
      this.viewCount = viewCount;
      this.writer = writer;
  }

  public static create(title: string, content: string, writer: number): Post {
      return new Post(title, content, 0, writer);
  }

  public getWriter() {
      return 'Writer';
  }

}

export const PostSchema = SchemaFactory.createForClass(Post);