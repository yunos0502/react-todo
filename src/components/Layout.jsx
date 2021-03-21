import React from 'react';
import styled from '@emotion/styled';

const Layout = props => {
	return (
			<Wrap>
				{props.children}
			</Wrap>
	);
};

const Wrap = styled.div`
	overflow: hidden;
  margin: 30px auto;
  padding: 0;
  width: 100%;
  max-width: 500px;

  h1 {
    width: 95%;
    margin: auto;
    text-align: center;
    font-size: 1.5rem;
    color: #202020;
  }
`;

export default Layout;