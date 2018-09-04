import * as React from 'react'
import { FieldProps } from 'formik'
import Geosuggest, { Suggest } from 'react-geosuggest'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import './geo.css'

interface Center {
  lat: number
  lng: number
}

const MapWithAMarker = withGoogleMap<{
  defaultZoom: number
  center: Center
  lat: number
  lng: number
  onClick: (e: google.maps.MouseEvent) => void
}>(
  props =>
    (
      <GoogleMap
        defaultZoom={props.defaultZoom}
        onClick={props.onClick}
        center={props.center}
      >
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      </GoogleMap>
    ) as any
)

interface State {
  center: Center | null
  defaultZoom: number | null
}

export class LocationField extends React.PureComponent<
  FieldProps<any> & {},
  State
> {
  state: State = {
    center: null,
    defaultZoom: null
  }
  onSuggestSelect = (place: Suggest) => {
    const {
      location: { lat, lng }
    } = place
    const {
      form: { setValues, values }
    } = this.props
    setValues({
      ...values,
      latitude: lat,
      longitude: lng
    })

    this.setState({
      center: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      },
      defaultZoom: 15
    })
  }

  render() {
    const {
      form: { values, setValues }
    } = this.props

    return (
      <div>
        <Geosuggest
          placeholder="Start typing!"
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(0, 0)}
          radius={20}
        />
        <div>{values.latitude}</div>
        <div>{values.longitude}</div>
        {this.state.center &&
          this.state.defaultZoom && (
            <MapWithAMarker
              containerElement={<div style={{ height: '400px' }} /> as any}
              mapElement={<div style={{ height: '100%' }} /> as any}
              lat={values.latitude}
              lng={values.longitude}
              center={this.state.center}
              defaultZoom={this.state.defaultZoom}
              onClick={x => {
                const lat = x.latLng.lat()
                const lng = x.latLng.lng()
                setValues({
                  ...values,
                  latitude: lat,
                  longitude: lng
                })
              }}
            />
          )}
      </div>
    )
  }
}
