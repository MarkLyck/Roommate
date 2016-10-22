import React from 'react'
import PlaceMarker from './Marker'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import SearchBox from 'react-google-maps/lib/places/SearchBox'

class GoogleMapsWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.clickedMap = this.clickedMap.bind(this)
    this.clickedMarker = this.clickedMarker.bind(this)

    this.state = {
      selectedRoom: { },
      showInfo: false,
    }
  }

  clickedMap() {
    if (this.state.showInfo)
      this.setState({ showInfo: false })
  }

  clickedMarker(room) {
    this.setState({
      showInfo: true,
      selectedRoom: room
    })
  }

  renderMarkers(rooms) {
    if (!rooms) {
      console.error('no rooms');
      return undefined
    }
    return rooms.map((room, i) =>
      <PlaceMarker key={i} room={room}
        handleClick={this.clickedMarker} />
    )
  }

  render() {

    // Styles must be inline to work with react-google-maps
    const SEARCHBOX_STYLE = {
      width: 'calc(100% - 32px)',
      marginTop: '16px',
      padding: '16px',
      boxSizing: 'border-box',
      zIndex: '1',
      MozBoxSizing: 'border-box',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
      fontSize: '14px',
      textOverflow: 'ellipses',
      border: 'none',
      borderRadius: '0',
    }

    return <GoogleMap
        ref={this.props.onMapLoad}
        defaultZoom={this.props.zoom}
        defaultCenter={{ lat: this.props.center[0], lng: this.props.center[1] }}
        mapTypeControl={false}
        onClick={this.clickedMap}
        options={{
          mapTypeControl: false,
          streetViewControl: false
        }}>

        {this.renderMarkers(this.props.rooms)}

        <SearchBox
          inputPlaceholder="Search"
          inputStyle={SEARCHBOX_STYLE}
          controlPosition={2}
          />

      </GoogleMap>
  }
}

export default withGoogleMap(GoogleMapsWrapper)