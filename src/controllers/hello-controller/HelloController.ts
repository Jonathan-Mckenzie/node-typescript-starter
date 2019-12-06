import {Body, Delete, Get, JsonController, Param, Post, Put, QueryParam} from 'routing-controllers';

@JsonController()
export class HelloController {
    @Get('/')
    hello() {
        return 'hello friend.';
    }

    @Get('/:name')
    helloName(@Param('name') name: string,
              @QueryParam('mood') mood: string) {
        if (mood) {
            return `Your name is ${name}. And you are feeling ${mood}`;
        } else {
            return `Hello, ${name}. What is your mood?`;
        }
    }

    @Put('/:id')
    helloPut(@Param('id') id: string,
             @Body({required: true}) hello: any ) {
        return {
            success: true,
            method: 'put',
            data: hello
        };
    }

    @Post('/')
    helloPost(@Body({required: true}) hello: any ) {
        return {
            success: true,
            method: 'post',
            data: hello
        };
    }

    @Delete('/:id')
    helloDelete(@Param('id') id: string) {
        return {
            success: true,
            message: `Successfully deleted ${id}`
        };
    }
}

