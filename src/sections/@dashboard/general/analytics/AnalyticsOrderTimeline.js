import PropTypes from 'prop-types';
// @mui
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// _mock_
import { _analyticOrderTimeline } from '../../../../_mock';



// ----------------------------------------------------------------------

const Data = [
  {
    title: 'Trust and Safety',
    description: 'We build our community on trust. Our hosts go through a rigorous vetting process before joining our community.',
  },
  {
    
    title: 'Curated Experiences',
    description: 'Our hosts have meticulously curated unique experiences that commit to delighting our guests',
  },
  {
    title: 'Sustainability',
    description: 'Our vision revolves around sustainable and eco-friendly tourism and our experts spend months designing a community model that promotes sustainable travel in Pakistan',
  },
  {
    title: 'Community Welfare',
    description: 'We make sure that whatever you spend with us creates a positive impact towards those in need; something which is at the heart of our ideology at Manaky.',
  },
];

export default function AnalyticsOrderTimeline() {
  return (
    
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none',
        },
      }}
    >
      <CardContent>
        <Timeline>
          {Data.map((data, index) => (
            <OrderItem item={data} isLast={index === Data.length - 1}  />
             ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    title: PropTypes.string,
  }),
};

function OrderItem({ item, isLast}) {
  const { title, description } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color = {'primary'}/>
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
