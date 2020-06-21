import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

import { GroupCard } from '../GroupCard';

import { GroupList_groups } from './__generated__/GroupList_groups.graphql';

interface Props {
	groups: GroupList_groups;
}

const GroupListView: React.FC<Props> = ({ groups }) => {
	return (
		<React.Fragment>
			{groups.edges.map(edge => (
				<GroupCard key={edge.node.id} group={edge.node} />
			))}
		</React.Fragment>
	);
};

export default createFragmentContainer(GroupListView, {
	groups: graphql`
		fragment GroupList_groups on GroupConnection {
			edges {
				node {
					id
					...GroupCard_group
				}
			}
		}
	`,
});
