import { StyleSheet, Animated, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Svg, { G, Circle } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';

const NextButton = ({ percentage, scrollTo }) => {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = size * Math.PI * radius;

    const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

    const progressAnimation = useRef(new Animated.Value(0)).current;

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animation(percentage);
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffsetValue =
                circumference - (circumference * value.value) / 100;
            console.log(value);
            setStrokeDashoffset(strokeDashoffsetValue);
        });
        // Return a cleanup function to remove the listener when the component unmounts
        return () => {
            progressAnimation.removeAllListeners();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Svg width={size} height={size} fill="#cdb6d1">
                <Circle
                    stroke="#E6E7E8"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke="#F4338F"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                />
            </Svg>
            <TouchableOpacity
                onPress={scrollTo}
                style={styles.button}
                activeOpacity={0.6}
            >
                <AntDesign name="arrowright" size={32} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
};

export default NextButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        backgroundColor: '#f4338f',
        borderRadius: 100,
        padding: 20,
    },
});
