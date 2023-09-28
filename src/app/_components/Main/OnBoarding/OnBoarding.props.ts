
import { MotionProps } from 'framer-motion'
import { ButtonHTMLAttributes, DetailedHTMLProps, RefAttributes } from "react"

export type OnBoardingProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    onBoarding: number
    onBoardingText: string
    onBoardingText3: string
    handleClick: () => void
    state: boolean | undefined
}