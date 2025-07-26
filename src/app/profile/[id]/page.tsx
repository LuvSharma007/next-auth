'use client'

export default function page({params}:any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 font-sans gap-4">
            <h1>Profile Page</h1>
            <h2 className="p-3 bg-white rounded text-black">{params.id}</h2>
        </div>
    )
}