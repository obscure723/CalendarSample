import React from 'react';
import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
  Dimensions,
} from 'react-native';

interface Props {
  move: () => void;
  start: () => void;
  finish: () => void;
}

const component: React.FC<Props> = ({move, start, finish}) => {
  const scale = React.useRef(new Animated.Value(0.9)).current;
  // const [position, setPosition] = React.useState(
  //   new Animated.ValueXY({x: 20, y: 20}),
  // );
  const [position, setPosition] = React.useState(new Animated.Value(100));

  const [canMove, setCanMove] = React.useState(false);

  let isClick = false;

  let onLongPressTimeout: NodeJS.Timeout;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      console.log('onPanResponderGrant');
      isClick = true;
      position.setOffset(position._value);

      // onLongPressTimeout = setTimeout(() => {
      //   isClick = false;
      //   console.log('ON LONG PRESS');
      //   start();
      //   setCanMove(true);
      //   position.setOffset({
      //     x: position.x._value,
      //     y: position.y._value,
      //   });

      //   Animated.timing(scale, {
      //     toValue: 1.1,
      //     duration: 30,
      //     useNativeDriver: false,
      //   }).start();
      // }, 800);
    },
    onPanResponderMove: (event, gesture) => {
      handlePanResponderMove(event, gesture);
    },
    onPanResponderRelease: () => {
      console.log('リリース');
      position.flattenOffset();
      // setCanMove(false);
      // clearTimeout(onLongPressTimeout);
      // console.log('onPanResponderRelease');
      // if (isClick) {
      //   alert('クリックだよ');
      // } else {
      //   Animated.timing(scale, {
      //     toValue: 0.9,
      //     duration: 300,
      //     useNativeDriver: false,
      //   }).start();
      // }
      // finish();
    },
  });

  const handlePanResponderMove = (
    e: GestureResponderEvent,
    gesture: PanResponderGestureState,
  ) => {
    console.log('onPanResponderMove');
    position.setValue(gesture.dy);
    setPosition(position);
    console.log(gesture.dy);

    if (Dimensions.get('screen').height < e.nativeEvent.pageY + 300) {
      move();
    }

    // console.log(position);
  };

  const _renderView = () => {
    return (
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: position,
              },
            ],
          },
          // {transform: [{scale: scale}]},
        ]}
        {...panResponder.panHandlers}>
        <View style={[styles.ball, canMove ? {backgroundColor: 'pink'} : {}]} />
      </Animated.View>
    );
  };

  return _renderView();
};

// define your styles
const styles = StyleSheet.create({
  ball: {
    height: 80,
    width: Dimensions.get('screen').width,
    backgroundColor: 'black',
    zIndex: 1000,
  },
});

export default component;
