/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 100;

const handleRotation = (progress) => {
  'worklet';

  return `${progress.value * 2 * Math.PI}rad`;
};

export default function AnimatedStyleUpdateExample(props) {
  const [state, setState] = useState(1);
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{scale: scale.value}, {rotate: handleRotation(progress)}],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 2, true);
    scale.value = withRepeat(withSpring(1), 2, true);
  }, [state]);

  return (
    <View
      style={{
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}>
      <Pressable onPress={() => setState(state + 1)}>
        <Animated.View
          style={[
            {height: SIZE, width: SIZE, backgroundColor: 'blue'},
            reanimatedStyle,
          ]}
        />
      </Pressable>
    </View>
  );
}
