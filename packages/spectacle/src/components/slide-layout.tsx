import Slide, { SlideProps } from './slide/slide';
import { Box, FlexBox } from './layout-primitives';
import { ComponentProps, Fragment, ReactNode } from 'react';
import { Heading, Text, ListItem, OrderedList, UnorderedList } from './typography';
import { Appear } from './appear';

/**
 * Full-slide layout
 */
const Full = ({ children, ...rest }: SlideProps) => (
  <Slide {...rest}>{children}</Slide>
);

/**
 * Statement offers vertically centered layout
 */
const Statement = ({ children, ...rest }: SlideProps) => (
  <Slide {...rest}>
    <FlexBox justifyContent="center" alignItems="center" height="100%">
      <Box>{children}</Box>
    </FlexBox>
  </Slide>
);

/**
 * Two-column layout
 */
const TwoColumn = ({
  left,
  right,
  ...rest
}: Omit<SlideProps, 'children'> & { left: ReactNode; right: ReactNode }) => (
  <Slide {...rest}>
    <FlexBox flexDirection="row" alignItems="start" flex={1}>
      <Box width="100%">{left}</Box>
      <Box width="100%">{right}</Box>
    </FlexBox>
  </Slide>
);

/**
 * List layout with optional title
 */
const List = ({
  title,
  items,
  listType = 'unordered',
  animateListItems = false,
  titleProps,
  listProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  title?: string;
  listType?: 'unordered' | 'ordered';
  items: ReactNode[];
  animateListItems?: boolean;
  titleProps?: ComponentProps<typeof Heading>;
  listProps?: ComponentProps<typeof UnorderedList & typeof OrderedList>;
}) => {
  const List = listType === 'unordered' ? UnorderedList : OrderedList;

  return (
    <Slide {...rest}>
      {title ? (
        <Heading textAlign="left" {...titleProps}>
          {title}
        </Heading>
      ) : null}
      {/* @ts-ignore TODO: Resolve this in follow-up */}
      <List {...listProps}>
        {items.map((item, i) => {
          const Wrapper = animateListItems ? Appear : Fragment;

          return (
            <Wrapper key={i}>
              <ListItem key={i}>{item}</ListItem>
            </Wrapper>
          );
        })}
      </List>
    </Slide>
  );
};

/**
 * vertically centered Section 
 */
 const Section = ({ children, ...rest }: SlideProps) => (
  <Slide {...rest}>
    <FlexBox justifyContent="left" height="100%">
      <Heading>{children}</Heading>
    </FlexBox>
  </Slide>
);

/**
 * Big Fact with optional fact information
 */
const BigFact = ({ fact, factInformation, ...rest }: Omit<SlideProps, 'children'> & {fact: string; factInformation?: string}) => (
  <Slide {...rest}>
    <FlexBox>
      <Box>
        <Text fontSize="250px" textAlign="center">{fact}</Text>
          {factInformation ? 
          <Text textAlign="center">{factInformation}</Text>
          : null}
      </Box>
    </FlexBox>
  </Slide>
);

/**
 * Quote layout
 */
 const Quote = ({ quote, quoteSize, attribution, ...rest }: Omit<SlideProps, 'children'> & {quote: string; quoteSize?: string; attribution: string}) => (
  <Slide {...rest}>
    <FlexBox flexDirection="column" alignItems="flex-start" height="100%">
      <Box>
        <Text fontSize={quoteSize ? quoteSize : "85px"}>{quote}</Text>
      </Box>
      <Box paddingLeft="32px">
        <Text>{attribution}</Text>
      </Box>    
    </FlexBox>
  </Slide>
);

/**
 * Layouts to consider:
 * - Image (left, right, full bleed?)
 * - Intro
 * - Quote
 * - Section
 * - Statement?
 * - Big fact?
 */

export default { Full, Statement, TwoColumn, List, Section, BigFact, Quote };
