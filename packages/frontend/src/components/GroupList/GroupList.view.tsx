import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';
import styled from 'styled-components';

import { GroupCard } from '../GroupCard';

import { GroupList_groups } from './__generated__/GroupList_groups.graphql';

interface Props {
	groups: GroupList_groups;
}

const GroupListWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 16px;
	row-gap: 16px;
	padding: 16px 0;
`;

const GroupListView: React.FC<Props> = ({ groups }) => {
	return (
		<GroupListWrapper>
			{groups.edges.map(edge => (
				<GroupCard key={edge.node.id} group={edge.node} />
			))}
		</GroupListWrapper>
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
