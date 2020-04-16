import { Field, ID, ObjectType } from 'type-graphql';

import Group from '../group/group';

@ObjectType()
export default class Item {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	group: Group;
}
