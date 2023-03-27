import React from 'react'

const Input = (props) => {
  return (
    <div className="flex flex-col">
                                        <label className="text-[#333333] opacity-70 text-[14px]">{props?.label}</label>
                                        <input name={props?.name} type={props?.type} className="border-[1px] text-[14px] rounded-[4px] p-[10px] mt-[5px]" placeholder={props?.placeholder} value={props?.value} onChange={props?.handleChange}  />
                                    </div>
  )
}

export default Input