    // BeforeAfterSlider.tsx
    import React, { useEffect } from 'react';
    import { View, Image, StyleSheet, Dimensions } from 'react-native';
    import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withDelay,
    Easing,
    withSequence,
    } from 'react-native-reanimated';

    const { width: SCREEN_WIDTH } = Dimensions.get('window');
    const CONTAINER_WIDTH = SCREEN_WIDTH - 38

    const DURATION = 3000; // 3 seconds in one direction
    const DELAY = 1000;     // 1 second pause at edges
    const BAR_WIDTH = 3;   // Width of white sweeping bar

    const BeforeAfterSlider = ({
    beforeImage,
    afterImage,
    }: {
    beforeImage: any;
    afterImage: any;
    }) => {
    const progress = useSharedValue(0);

    // Looping horizontal sweep animation
    useEffect(() => {
    const animate = () => {
        progress.value = withRepeat(
        withSequence(
            withDelay(DELAY, withTiming(1, { duration: DURATION })),
            withDelay(DELAY, withTiming(0, { duration: DURATION }))
        ),
        -1, // infinite
        false // no auto-reverse since we manually reverse
        );
    };

    animate();
    }, []);


    // Sweep bar animation style
    const sweepStyle = useAnimatedStyle(() => {
        const translateX = progress.value * (CONTAINER_WIDTH - BAR_WIDTH);
        return {
        transform: [{ translateX }],
        };
    });

    // Clipping the After image
    const maskStyle = useAnimatedStyle(() => {
        const clipWidth = progress.value * CONTAINER_WIDTH;
        return {
        width: clipWidth,
        };
    });

    return (
        <View className='w-full'>
        {/* Before image */}
        <Image source={beforeImage} className='h-64 w-full' style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}} resizeMode='cover' />

        {/* Animated mask for After image */}
        <Animated.View style={[StyleSheet.absoluteFillObject, maskStyle, { overflow: 'hidden' }]}>
            <Image source={afterImage} className="h-64" style={[{backgroundColor: "blue", borderTopLeftRadius: 10, borderTopRightRadius: 10, width: CONTAINER_WIDTH}]} resizeMode='cover'/>
        </Animated.View>

        {/* Sweeping white bar */}
        <Animated.View
            style={[
            styles.sweepBar,
            sweepStyle,
            ]}
        />
        </View>
    );
    };

    const styles = StyleSheet.create({
    sweepBar: {
        position: 'absolute',
        width: BAR_WIDTH,
        height: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    });

    export default BeforeAfterSlider;