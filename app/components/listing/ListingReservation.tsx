"use client"

import React from 'react'
import { Range } from 'react-date-range'
import { Button } from '../Button'
import Calender from '../input/Calender'

interface ListingReservationProp{
    price : number,
    dateRange : Range,
    totalPrice : number,
    onChangeDate : (date : Range) => void,
    onSubmit : ()=> void,
    disabled ?: boolean,
    disableDates : Date[]
}   

const ListingReservation : React.FC<ListingReservationProp> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disableDates
}) => {
  return (
    <div 
    className="
    bg-white 
      rounded-xl 
      border-[1px]
    border-neutral-200 
      overflow-hidden
    "
  >
    <div className="
    flex flex-row items-center gap-1 p-4">
      <div className="text-2xl font-semibold">
        $ {price}
      </div>
      <div className="font-light text-neutral-600">
        night
      </div>
    </div>
    <hr />
    <Calender
      value={dateRange}
      disableDates={disableDates}
      onChange={(value) => 
        onChangeDate(value.selection)}
    />
    <hr />
    <div className="p-4">
      <Button 
        disabled={disabled} 
        label="Reserve" 
        onClick={onSubmit}
      />
    </div>
    <hr />
    <div 
      className="
        p-4 
        flex 
        flex-row 
        items-center 
        justify-between
        font-semibold
        text-lg
      "
    >
      <div>
        Total
      </div>
      <div>
        $ {totalPrice}
      </div>
    </div>
  </div>
  )
}

export default ListingReservation