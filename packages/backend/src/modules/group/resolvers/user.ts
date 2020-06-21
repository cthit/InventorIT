import { GroupModuleResolversType } from '..';
import { connectionFromArray } from '../../../utils/relay';
import { GroupProvider } from '../group.provider';

const resolvers: GroupModuleResolversType = {
	User: {
		groups: async ({ id }, input, { injector }) => {
			const groups = await injector.get(GroupProvider).getGroupsByUserId(id);

			try {
				return connectionFromArray(groups, input);
			} catch (error) {
				return null;
			}
		},
	},
};

export default resolvers;
