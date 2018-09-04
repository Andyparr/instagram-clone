import * as React from 'react'
import { ViewListing, UpdateListing } from '@airbnb/controller'
import { RouteComponentProps } from 'react-router-dom'
import { ListingForm, defaultListingFormValues } from '../shared/ListingForm'

export class UpdateListingConnector extends React.PureComponent<
  RouteComponentProps<{
    listingId: string
  }>
> {
  render() {
    const {
      match: {
        params: { listingId }
      }
    } = this.props
    return (
      <ViewListing listingId={listingId}>
        {data => {
          console.log(data)
          if (!data.listing) {
            return <div>...loading</div>
          }

          const { id: _, owner: __, ...listing } = data.listing

          return (
            <UpdateListing>
              {({ updateListing }) => (
                <ListingForm
                  initialValues={{ ...defaultListingFormValues, ...listing }}
                  submit={async values => {
                    const {
                      __typename: ___,
                      pictureUrl,
                      ...newValues
                    } = values as any

                    if (newValues.pictureUrl) {
                      const parts = pictureUrl.split('/')
                      newValues.pictureUrl = parts[parts.length - 1]
                    }

                    await updateListing({
                      variables: {
                        input: newValues,
                        listingId
                      }
                    })
                  }}
                />
              )}
            </UpdateListing>
          )
        }}
      </ViewListing>
    )
  }
}
