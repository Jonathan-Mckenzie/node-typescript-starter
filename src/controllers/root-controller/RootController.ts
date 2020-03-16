import {Controller, Get} from 'routing-controllers';

@Controller()
export class RootController {

    static Greeting = 'Hello friend. I am the node typescript starter.';

    @Get('/')
    helloFriend() {
        return RootController.Greeting;
    }
}
