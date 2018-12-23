import React from 'react';
import Emoji, { EmojiProps } from './Emoji';
import { connect } from 'dva';

interface RealtimeEmojiProps extends EmojiProps {
  value: number,
}

function RealtimeEmoji(props: RealtimeEmojiProps) {
  const { value } = props;
  let symbol = '😕';
  if (value >= 0.0 && value <= 0.5) {
    symbol = '☹️';
  } else if (value > 0.5 && value <= 0.7) {
    symbol = '😐'
  } else if (value > 0.7) {
    symbol = '😀';
  }

  return <Emoji {...props} symbol={symbol} />
}

const mapStateToProps = (state: any) => ({
  value: state.realtime.latest.phototransistor,
});

export default connect(mapStateToProps)(RealtimeEmoji);
