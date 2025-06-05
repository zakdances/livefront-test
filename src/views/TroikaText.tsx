import { useRef, useState, useLayoutEffect } from 'react';
import { extend } from '@react-three/fiber';
import type { ThreeElement } from '@react-three/fiber';
import { Text } from "troika-three-text";

// Extend R3F with the custom Text class
extend({ TroikaText: Text });

// Add type definition for JSX support
declare module '@react-three/fiber' {
    interface ThreeElements {
        troikaText: ThreeElement<Text>
    }
}

type Props = {
    text: string
    fontSize?: number
    color?: string
    [key: string]: any // allow passing any prop to <troikaText />
}

export default function TroikaText({
    text,
    fontSize = 0.2,
    color = 'white',
    ...props
}: Props) {
    const ref = useRef<Text>(null!)

    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.sync()
        }
    }, [text, fontSize, color])

    return (
        <troikaText
            ref={ref}
            text={text}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
            {...props}
        />
    )
}