import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { connect } from 'dva';

function Charts(props: any) {
  const { data } = props;

  return (
    <ResponsiveContainer height={300}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="phototransistor" stroke="#8884d8" />
        <XAxis dataKey="timestamp" tickFormatter={(item) => item.toLocaleString() } />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}

function mapStateToProps(state: any) {
  return {
    data: state.realtime.history,
  };
}

export default connect(mapStateToProps)(Charts);
