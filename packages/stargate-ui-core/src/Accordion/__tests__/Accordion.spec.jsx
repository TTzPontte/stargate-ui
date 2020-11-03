import React from 'react';

import Accordion from '../Accordion';
import AccordionSummary from '../AccordionSummary';
import AccordionDetails from '../AccordionDetails';

describe('Accordion', () => {
  it('should render properly', () => {
    const { container } = render(
      <Accordion>
        <AccordionSummary>
          Accordion Summary
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut voluptate ad distinctio quas vel praesentium, est vero suscipit dignissimos, reprehenderit, cumque nam incidunt reiciendis quibusdam nihil dolorem perferendis eos accusamus?
        </AccordionDetails>
      </Accordion>,
    );

    expect(container).toMatchSnapshot();
  });
});
