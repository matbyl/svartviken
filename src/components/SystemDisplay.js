import React from 'react'
import tw, { styled } from 'twin.macro'

const SystemName = styled.div`
  ${tw`text-gray-800`}
`

class SystemDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = props.system !== null ? props.system.systemName : null
    }

    render() {
        return this.displayName !== null ? (
            <SystemName>{this.displayName}</SystemName>
        ) : null
    }
}

SystemDisplay.defaultProps = {
    system: null,
}

export default SystemDisplay