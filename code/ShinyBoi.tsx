import * as React from "react"
import {
    Frame,
    useCycle,
    useTransform,
    transform,
    useMotionValue,
    Override,
    addPropertyControls,
    ControlType,
} from "framer"

import { Helmet } from "react-helmet"

/*
TODO: Shiny FX v1
- [x] text linear gradient
- [x] make gradient move with the phone
- [x] change the color of the gradient
- [x] change the direction of the gradient
- [x] fork Ben's google font component
- [] make gradient move with the desktop automatically

- svg gradient. Override or import? 
- single gradient for the whole page or for a single element
- radial gradient
*/

export function ShinyBoi(props) {
    const {
        text,
        font,
        weight,
        size,
        colorStart,
        colorMiddle,
        colorEnd,
        style,
        spacing,
        line,
        align,
        direction,
        type,
        angle,
    } = props

    const { x, y, z, hasGyro } = useGyro()
    const w = Number.parseInt(`${weight}`)

    const mX = transform(y, [-90, 90], [0, 100])

    const textStyles = {
        fontSize: `${size}px`,
        fontFamily: `${font}`,
        fontWeight: w,
        fontStyle: `${style}`,
        letterSpacing: `${spacing + 0.0001}px`, // Hack to make it work better with flexbox
        paddingLeft: `${spacing}px`,
        lineHeight: `${line}`,
        background: `linear-gradient(${angle}deg, ${colorStart} 0%, ${colorMiddle} ${mX}%, ${colorEnd} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    }
    return (
        <>
            <Helmet>
                <link
                    href={`https://fonts.googleapis.com/css?family=${font}:${weight}`}
                    rel="stylesheet"
                />
            </Helmet>
            {type === "text" ? (
                <Frame
                    background={null}
                    size="100%"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <p style={textStyles}>{`${text}`}</p>
                </Frame>
            ) : (
                <Frame
                    style={{
                        display: "grid",
                        fontSize: 60,
                    }}
                    size={"100%"}
                    background={`linear-gradient(${angle}deg, ${colorStart} 0%, ${colorMiddle} ${mX}%, ${colorEnd} 100%)`}
                />
            )}
        </>
    )
}

ShinyBoi.defaultProps = {
    text: "Shiny FX",
    font: "Orbitron",
    weight: "400",
    size: 40,
    colorStart: "rgba(2,0,36,1)",
    colorMiddle: "rgba(5,109,187,1)",
    colorEnd: "rgba(0,212,255,1)",
    style: "normal",
    spacing: 0,
    line: 1,
    align: "center",
    direction: "ltr",
    type: "text",
    angle: 320,
}

addPropertyControls(ShinyBoi, {
    colorStart: { type: ControlType.Color, title: "Start" },
    colorMiddle: { type: ControlType.Color, title: "Middle" },
    colorEnd: { type: ControlType.Color, title: "End" },
    type: {
        type: ControlType.Enum,
        title: "Shiny Type",
        options: ["text", "background"],
        optionTitles: ["Text", "Background"],
    },
    angle: {
        type: ControlType.Number,
        title: "Angle",
        min: 0,
        max: 360,
        step: 1,
    },
    text: {
        type: ControlType.String,
        title: "Value",
        hidden(props) {
            return props.type === "background" ? true : false
        },
    },
    font: {
        type: ControlType.String,
        title: "Font",
        hidden(props) {
            return props.type === "background" ? true : false
        },
    },
    size: {
        type: ControlType.Number,
        title: "Size",
        min: 0,
        max: 500,
        hidden(props) {
            return props.type === "background" ? true : false
        },
    },
    weight: {
        type: ControlType.Enum,
        title: "Weight",
        options: [
            "100",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900",
        ],
        hidden(props) {
            return props.type === "background" ? true : false
        },
    },
    style: {
        type: ControlType.Enum,
        title: "Style",
        options: ["normal", "italic", "oblique"],
        optionTitles: ["Normal", "Italic", "Oblique"],
        hidden(props) {
            return props.type === "background" ? true : false
        },
    },
    spacing: {
        type: ControlType.Number,
        title: "Spacing",
        min: -30,
        max: 30,
        step: 0.1,
        hidden(props) {
            return props.type === "background" ? true : false
        },
    },
    line: {
        type: ControlType.Number,
        title: "Line",
        min: 0,
        max: 5,
        step: 0.1,
        hidden(props) {
            return props.type === "background" ? true : false
        },
    },
})

export function useGyro() {
    const [gyroData, setGyroData] = React.useState({
        x: 0,
        y: 0,
        z: 0,
        hasGyro: window.DeviceOrientationEvent ? true : false,
    })

    React.useEffect(() => {
        function handleOrientation(event) {
            const absolute = event.absolute
            const alpha = Math.round(event.alpha)
            const beta = Math.round(event.beta)
            const gamma = Math.round(event.gamma)
            console.log(window)

            setGyroData({
                x: beta, // -180 to 180
                y: gamma, //  -90 to 90
                z: alpha, //    0 to 360
                hasGyro: window.DeviceOrientationEvent ? true : false,
            })
        }

        window.addEventListener("deviceorientation", handleOrientation, true)

        return () => {
            window.removeEventListener(
                "deviceorientation",
                handleOrientation,
                true
            )
        }
    }, [])

    return gyroData
}

export function parallaxForeground(): Override {
    const { x, y, z } = useGyro()
    const mX = transform(y, [-90, 90], [-10, 10])
    return {
        x: mX,
    }
}

export function parallaxMiddleground(): Override {
    const { x, y, z } = useGyro()
    const mX = transform(y, [-90, 90], [-30, 30])
    return {
        x: mX,
    }
}

export function parallaxBackground(): Override {
    const { x, y, z } = useGyro()
    const mX = transform(y, [-90, 90], [-100, 100])
    return {
        x: mX,
    }
}
