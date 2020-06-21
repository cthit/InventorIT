import React from 'react';

import { Link } from 'found';
import { createFragmentContainer, graphql } from 'react-relay';
import styled from 'styled-components';

import { GroupCard_group } from './__generated__/GroupCard_group.graphql';

interface Props {
	group: GroupCard_group;
}

const GroupCardWrapper = styled.div`
	background: green;
	width: 250px;
	border-radius: 10px;
	overflow: hidden;
`;
const GroupCardImage = styled.div`
	height: 200px;
	background: lightgrey;
`;
const GroupCardContent = styled.div`
	padding: 20px;
`;

const GroupCardView: React.FC<Props> = ({ group }) => {
	return (
		<GroupCardWrapper>
			<Link to={`/groups/${group.id}`}>
				<GroupCardImage />
			</Link>
			<GroupCardContent>
				<Link to={`/groups/${group.id}`}>
					<h1 style={{ margin: '0', color: 'black' }}>{group.name}</h1>
				</Link>
				<p>Items: {group.items ? group.items.totalCount : 0}</p>
			</GroupCardContent>
		</GroupCardWrapper>
	);
};

export default createFragmentContainer(GroupCardView, {
	group: graphql`
		fragment GroupCard_group on Group {
			id
			name
			items {
				totalCount
			}
		}
	`,
});
