import React from 'react'
import tw, { styled } from 'twin.macro'

const SystemName = styled.div`
  ${tw`text-gray-800`}
`

class SystemDisplay extends React.Component {
    constructor(props) {
        super(props)
        if (props.system !== null) {
            this.displayName = props.system.systemName
        } else if (props.firstOf !== null && props.firstOf.length > 0) {
            this.displayName = props.firstOf[0].systemName
        } else {
            this.displayName = null
        }
    }

    render() {
        return this.displayName !== null ? (
            <SystemName>{this.displayName}</SystemName>
        ) : null
    }
}

SystemDisplay.defaultProps = {
    system: null,
    firstOf: null,
}

export default SystemDisplay