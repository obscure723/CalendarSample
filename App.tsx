import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
} from 'react-native';
import dayjs from 'dayjs';
import {
  Calendar,
  CalendarEvent,
  CalendarX,
  CalendarXDay,
  MyCalendar,
} from './src';

import {Calendar as CCC} from 'react-native-big-calendar';

// const events = [
//   {
//     title: 'Meeting',
//     start: dayjs().set('hour', 10).set('minute', 0).toDate(),
//     end: dayjs().set('hour', 10).set('minute', 39).toDate(),
//   },
//   // {
//   //   title: 'Coffee break',
//   //   start: dayjs().set('hour', 14).set('minute', 30).toDate(),
//   //   end: dayjs().set('hour', 15).set('minute', 30).toDate(),
//   // },
//   // {
//   //   title: 'Repair my car',
//   //   start: dayjs().add(1, 'day').set('hour', 7).set('minute', 45).toDate(),
//   //   end: dayjs().add(1, 'day').set('hour', 13).set('minute', 30).toDate(),
//   // },
// ];

// const App = () => {
//   const [additionalEvents, setAdditionalEvents] = React.useState([]);
//   const addEvent = React.useCallback(
//     (start: Date) => {
//       const title = 'new Event';
//       const end = dayjs(start).add(59, 'minute');
//       setAdditionalEvents([...additionalEvents, {start, end, title}]);
//     },
//     [additionalEvents, setAdditionalEvents],
//   );

//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         {/* <Calendar
//           height={Dimensions.get('window').height - 50}
//           events={[...events, ...additionalEvents]}
//           onPressCell={addEvent}
//           onPressEvent={(e) => alert(e.title)}
//           mode="day"
//         /> */}
//         <CCC
//           height={Dimensions.get('window').height - 50}
//           events={[...events, ...additionalEvents]}
//           mode="day"
//         />
//       </SafeAreaView>
//     </>
//   );
// };

// export default App;

// type State = {
//   days: [];
// };

// export default class App extends React.Component<Props, State> {
//   state = {
//     days: [],
//   };

//   componentWillMount() {
//     for (let i = 1; i <= 357; i++) {
//       // this.state.days.push({id: i, number: i, active: Math.random() >= 0.5});
//       this.state.days.push({id: i, number: i, active: false});
//     }
//   }

//   onSingleCellSelection = (dayIndex: number) => {
//     const days = this.state.days;
//     days[dayIndex].active = !days[dayIndex].active;
//     this.setState({
//       days,
//     });
//   };

//   onMultiSelectionEnd = (selectionMode: string, selection: Array<number>) => {
//     const days = this.state.days;
//     for (const index in selection) {
//       days[selection[index]].active = selectionMode === 'select';
//     }
//     this.setState({days});
//   };

//   renderCell = (day: {}) => <CalendarXDay {...day} />;

//   render() {
//     return (
//       <CalendarX
//         days={this.state.days}
//         renderCell={this.renderCell}
//         onSingleCellSelection={this.onSingleCellSelection}
//         onMultiSelectionEnd={this.onMultiSelectionEnd}
//       />
//     );
//   }
// }

import Ball from './src/Ball2';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';

const App: React.FC = () => {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [val, setVal] = React.useState(0);
  const [canMove, setCanMove] = React.useState(false);

  let onLongPressTimeout: NodeJS.Timeout;

  let y = 0;

  React.useEffect(() => {
    setInterval(() => {
      // scrollViewRef.current?.scrollTo({y: scrollPosition + 100});
      // scrollViewRef.current?.scrollTo({y: (y += 1)});
    }, 100);
  }, []);

  const [canMove1, setCanMove1] = React.useState(true);

  const _scrollDown = () => {
    console.log('_scrollDown');
    // if (canMove1) {
    //   setCanMove1(false);
    scrollViewRef.current?.scrollTo({y: (y += 20)});
    // }
    // setTimeout(() => setCanMove1(true), 500);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // console.log('onScrollonScroll');
    // console.log(event.nativeEvent.contentOffset.y);
    // setScrollPosition(event.nativeEvent.contentOffset.y);
  };

  let offsetY = 0;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      onLongPressTimeout = setTimeout(() => {
        setCanMove(true);
      }, 800);
    },
    onPanResponderMove: (event, gesture) => {
      // const diffY = event.nativeEvent.contentOffset.y - offset.current.y;
      // const diffX = event.nativeEvent.contentOffset.x - offset.current.x;

      // const diff = event.nativeEvent.locationY - offsetY;

      // offsetY = event.nativeEvent.locationY;

      // if (diff < 0) {
      //   scrollViewRef.current?.scrollTo({
      //     y: scrollPosition + 100,
      //     animated: true,
      //   });
      // } else {
      //   scrollViewRef.current?.scrollTo({
      //     y: scrollPosition - 100,
      //     animated: true,
      //   });
      // }

      // if (canMove) {
      console.log(event.nativeEvent.locationY);
      // setScrollEnabled(false);
      // scrollViewRef.current?.scrollTo({
      //   y: scrollPosition + 1000,
      //   animated: true,
      // });
      // console.log(scrollPosition + gesture.dy);
      // }
    },
    onPanResponderRelease: () => {
      clearInterval(onLongPressTimeout);
      console.log('終わり');
      setVal(0);
      setScrollEnabled(true);
    },
  });

  return (
    <>
      <Ball
        move={_scrollDown}
        start={() => setScrollEnabled(false)}
        finish={() => setScrollEnabled(true)}
      />
      <ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEnabled={false}
        // scrollEventThrottle={18}
        style={[styles.container, {marginTop: 150, zIndex: -1}]}
        // onMomentumScrollEnd={() => setCanMove1(true)}
      >
        {/* <View {...panResponder.panHandlers} style={{flex: 1}}> */}

        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => {
          return (
            <>
              <View
                style={{height: 300, backgroundColor: 'red', zIndex: -10}}
              />
              <View
                style={{height: 300, backgroundColor: 'blue', zIndex: -10}}
              />
              <View
                style={{height: 300, backgroundColor: 'red', zIndex: -10}}
              />
              <View
                style={{height: 300, backgroundColor: 'blue', zIndex: -10}}
              />
              <View
                style={{height: 300, backgroundColor: 'red', zIndex: -10}}
              />
              <View
                style={{height: 300, backgroundColor: 'blue', zIndex: -10}}
              />
              <View
                style={{height: 300, backgroundColor: 'red', zIndex: -10}}
              />
              <View
                style={{height: 300, backgroundColor: 'blue', zIndex: -10}}
              />
            </>
          );
        })}
        {/* </View> */}
      </ScrollView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

// const component: React.FC = () => {
//   return <MyCalendar />;
// };

// export default component;

// import {useState, useCallback} from 'react';
// import {TouchableOpacity} from 'react-native';
// import DraggableFlatList, {
//   RenderItemParams,
// } from 'react-native-draggable-flatlist';

// const NUM_ITEMS = 10;

// function getColor(i: number) {
//   const multiplier = 255 / (NUM_ITEMS - 1);
//   const colorVal = i * multiplier;
//   return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
// }

// const exampleData: Item[] = [...Array(20)].map((d, index) => {
//   const backgroundColor = getColor(index);
//   return {
//     key: `item-${backgroundColor}`,
//     label: String(index),
//     backgroundColor,
//   };
// });

// type Item = {
//   key: string;
//   label: string;
//   backgroundColor: string;
// };

// function Example() {
//   const [data, setData] = useState(exampleData);

//   const renderItem = useCallback(
//     ({item, index, drag, isActive}: RenderItemParams<Item>) => {
//       return (
//         <TouchableOpacity
//           style={{
//             height: 100,
//             backgroundColor: isActive ? 'red' : item.backgroundColor,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//           onLongPress={drag}>
//           <Text
//             style={{
//               fontWeight: 'bold',
//               color: 'white',
//               fontSize: 32,
//             }}>
//             {item.label}
//           </Text>
//         </TouchableOpacity>
//       );
//     },
//     [],
//   );

//   return (
//     <View style={{flex: 1}}>
//       <DraggableFlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => `draggable-item-${item.key}`}
//         onDragEnd={({data}) => setData(data)}
//       />
//     </View>
//   );
// }

// export default Example;

// export default class scrollPan extends React.Component {
//   constructor(props) {
//     super(props);
//     this.wrapperPanResponder = PanResponder.create({
//       onStartShouldSetPanResponder: (e, g) => true,
//       onPanResponderGrant: () => {
//         console.log('GRANTED TO WRAPPER');
//       },
//       onPanResponderMove: (evt, gestureState) => {
//         console.log('WRAPPER MOVED');
//       },
//     });

//     this.scollerPanResponder = PanResponder.create({
//       onStartShouldSetPanResponder: (e, g) => true,
//       onPanResponderGrant: () => {
//         console.log('GRANTED TO SCROLLER');
//       },
//       onPanResponderMove: (evt, gestureState) => {
//         console.log('SCROLLER MOVED');
//       },
//     });
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <View
//           style={styles.pan_container}
//           {...this.wrapperPanResponder.panHandlers}
//         />
//         <ScrollView
//           onScroll={() => console.log('scrolled')}
//           style={styles.scroll_view}
//           {...this.scollerPanResponder.panHandlers}>
//           <Text style={{fontSize: 96}}>Scroll this</Text>
//           <Text style={{fontSize: 96}}>Scroll this</Text>
//           <Text style={{fontSize: 96}}>Scroll this</Text>
//           <Text style={{fontSize: 96}}>Scroll this</Text>
//           <Text style={{fontSize: 96}}>Scroll this</Text>
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   pan_container: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'blue',
//   },
//   scroll_view: {
//     backgroundColor: 'teal',
//     maxHeight: 350,
//   },
// });

// import {useState, useCallback} from 'react';
// import {TouchableOpacity} from 'react-native';
// import DraggableFlatList, {
//   RenderItemParams,
// } from 'react-native-draggable-flatlist';

// const NUM_ITEMS = 10;

// function getColor(i: number) {
//   const multiplier = 255 / (NUM_ITEMS - 1);
//   const colorVal = i * multiplier;
//   return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
// }

// const exampleData: Item[] = [...Array(20)].map((d, index) => {
//   const backgroundColor = getColor(index);
//   return {
//     key: `item-${backgroundColor}`,
//     label: String(index),
//     backgroundColor,
//   };
// });

// type Item = {
//   key: string;
//   label: string;
//   backgroundColor: string;
// };

// const Example: React.FC = () => {
//   const [data, setData] = useState(exampleData);

//   const renderItem = useCallback(
//     ({item, index, drag, isActive}: RenderItemParams<Item>) => {
//       return (
//         <TouchableOpacity
//           style={{
//             height: 100,
//             backgroundColor: isActive ? 'red' : item.backgroundColor,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//           onLongPress={drag}>
//           <Text
//             style={{
//               fontWeight: 'bold',
//               color: 'white',
//               fontSize: 32,
//             }}>
//             {item.label}
//           </Text>
//         </TouchableOpacity>
//       );
//     },
//     [],
//   );

//   return (
//     <View style={{flex: 1, backgroundColor: 'red'}}>
//       <DraggableFlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => `draggable-item-${item.key}`}
//         onDragEnd={({data}) => setData(data)}
//         dragItemOverflow={false}
//       />
//     </View>
//   );
// };

// export default Example;

// import Ball from './src/Ball2';
// import {NativeSyntheticEvent, NativeScrollEvent, FlatList} from 'react-native';

// const App: React.FC = () => {
//   const scrollViewRef = React.useRef<FlatList>(null);
//   const [scrollEnabled, setScrollEnabled] = React.useState(true);
//   const [scrollPosition, setScrollPosition] = React.useState(0);
//   const [val, setVal] = React.useState(0);
//   const [canMove, setCanMove] = React.useState(false);

//   let onLongPressTimeout: NodeJS.Timeout;

//   let y = 0;

//   React.useEffect(() => {
//     setInterval(() => {
//       // scrollViewRef.current?.scrollTo({y: scrollPosition + 100});
//       // scrollViewRef.current?.scrollTo({y: (y += 1)});
//     }, 100);
//   }, []);

//   const [canMove1, setCanMove1] = React.useState(true);

//   const _scrollDown = () => {
//     console.log('_scrollDown');
//     // if (canMove1) {
//     setCanMove1(false);
//     // scrollViewRef.current?.scrollTo({ y: (y += 100) });
//     scrollViewRef.current.scrollToOffset({
//       offset: (y += 20),
//       animated: false,
//     });
//     // }
//     // setTimeout(() => setCanMove1(true), 500);
//   };

//   const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     // console.log('onScrollonScroll');
//     // console.log(event.nativeEvent.contentOffset.y);
//     // setScrollPosition(event.nativeEvent.contentOffset.y);
//   };

//   let offsetY = 0;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderGrant: () => {
//       onLongPressTimeout = setTimeout(() => {
//         setCanMove(true);
//       }, 800);
//     },
//     onPanResponderMove: (event, gesture) => {
//       // const diffY = event.nativeEvent.contentOffset.y - offset.current.y;
//       // const diffX = event.nativeEvent.contentOffset.x - offset.current.x;

//       // const diff = event.nativeEvent.locationY - offsetY;

//       // offsetY = event.nativeEvent.locationY;

//       // if (diff < 0) {
//       //   scrollViewRef.current?.scrollTo({
//       //     y: scrollPosition + 100,
//       //     animated: true,
//       //   });
//       // } else {
//       //   scrollViewRef.current?.scrollTo({
//       //     y: scrollPosition - 100,
//       //     animated: true,
//       //   });
//       // }

//       // if (canMove) {
//       console.log(event.nativeEvent.locationY);
//       // setScrollEnabled(false);
//       // scrollViewRef.current?.scrollTo({
//       //   y: scrollPosition + 1000,
//       //   animated: true,
//       // });
//       // console.log(scrollPosition + gesture.dy);
//       // }
//     },
//     onPanResponderRelease: () => {
//       clearInterval(onLongPressTimeout);
//       console.log('終わり');
//       setVal(0);
//       setScrollEnabled(true);
//     },
//   });

//   const _renderItem = () => {
//     return (
//       <>
//         <Ball
//           move={_scrollDown}
//           start={() => setScrollEnabled(false)}
//           finish={() => setScrollEnabled(true)}
//         />
//         <View style={{height: 300, backgroundColor: 'red', zIndex: -10}} />
//         <View style={{height: 300, backgroundColor: 'blue', zIndex: -10}} />
//       </>
//     );
//   };

//   return (
//     <>
//       {/* <Ball
//         move={_scrollDown}
//         start={() => setScrollEnabled(false)}
//         finish={() => setScrollEnabled(true)}
//       /> */}
//       <FlatList
//         scrollEnabled={false}
//         ref={scrollViewRef}
//         data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
//         renderItem={_renderItem}
//         style={{zIndex: -1}}
//       />
//     </>
//   );
// };

// export default App;
