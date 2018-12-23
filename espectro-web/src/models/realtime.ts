
import mqtt from 'mqtt';
import { SubscriptionAPI } from 'dva';
import { AnyAction } from 'redux';

interface RealtimeState {
  history: Array<any>,
  latest: any,
}

export default {
  namespace: `realtime`,
  state: {
    history: [],
    latest: {},
  },

  reducers: {
    incomingData(state: RealtimeState, { value }: AnyAction) {
      let history = state.history.slice();
      history.push(value);

      if (history.length >= 20) {
        history.shift();
      }

      return {
        ...state,
        history: history,
        latest: {...value},
      };
    }
  },

  subscriptions: {
    mqttSubscription({ dispatch }: SubscriptionAPI) {
      const client = mqtt.connect(`mqtt://xperiment.southeastasia.cloudapp.azure.com:8888`, {
        clientId: `web-${Date.now()}`,
      });

      client.on(`connect`, () => {
        console.log(`Connected to MQTT broker`);
        client.subscribe(`devcember/espectro/tx`, { qos: 1 });
      });

      client.on(`message`, (topic, message) => {
        if (topic === `devcember/espectro/tx`) {
          const str = message.toString();
          try {
            const payload = JSON.parse(str);
            
            dispatch({ type: `incomingData`, value: { timestamp: new Date(), ...payload }});
          } catch (ex) {
            console.error(`failed processing payload`, ex.stack);
          }
        }
      });

      return () => {
        client.end();
      }
    }
  },
}
