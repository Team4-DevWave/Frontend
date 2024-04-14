
// import React, { Component } from 'react';
// import { Meta } from '@storybook/react';
// import SortOptions from '../components/SortOptions';
// import exp from 'constants';

// export default {
//   title: "SortOptions",
//   component: SortOptions,


//   tags: ['autodocs'],
 
 
// };


// export const SortOptions1 = (args) => (
//   <>
    
//     <SortOptions />
//   </>
// );

import React from 'react';
import SortOptions from '../components/SortOptions';

export default {
  title: "SortOptions",
  component: SortOptions,
  tags:['autodocs'],

  
};

export const SortOptions1 = (args) => (
  <SortOptions {...args} />
);
