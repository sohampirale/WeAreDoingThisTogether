import React from 'react'
import Image from './Image.jsx'
import Note from "../Note/Note.jsx"
import AddNote from "../Note/AddNote.jsx"

function AllImages({ data,albumId,helperFetch }) {
  console.log('Inside AllImages data : '+JSON.stringify(data));

  // Function to check if resource is a video
  const isVideo = (format) => {
    const videoFormats = ['mp4', 'webm', 'ogg', 'avi', 'mov', 'wmv', 'flv', 'm4v'];
    return format && videoFormats.includes(format.toLowerCase());
  };

  // Function to render media (image or video)
  const renderMedia = (resource) => {
    if (isVideo(resource?.format)) {
      return (
        <video 
          controls 
          className="w-full h-auto"
          style={{ maxHeight: '400px' }}
        >
          <source src={resource?.secure_url} type={`video/${resource?.format}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <Image imageUrl={resource?.secure_url}/>;
    }
  };
     
  return (
    <div className="space-y-6">
        {data && data.length!=0?(
            <div className="grid grid-cols-1 gap-8">
                {data.map((obj, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-6 hover:shadow-xl transition-all duration-300">
                        {/* Resource Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">{isVideo(obj.resource?.format) ? '🎥' : '📸'}</span>
                                <h3 className="text-lg font-semibold text-rose-700">
                                    Memory #{index + 1}
                                </h3>
                            </div>
                            <div className="text-xs text-pink-500 bg-pink-100 px-3 py-1 rounded-full font-medium">
                                {obj.resource?.format?.toUpperCase() || 'Media'}
                            </div>
                        </div>

                        {/* Media Display */}
                        <div className="mb-6">
                            <div className="rounded-xl overflow-hidden shadow-md border-2 border-pink-200">
                                {renderMedia(obj.resource)}
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div className="space-y-3">
                                  <AddNote albumId={albumId} resourceId={obj.resource?._id} helperFetch={helperFetch}/>
                            <div className="flex items-center space-x-2 mb-3">
                                <span className="text-lg">💭</span>
                                <h4 className="text-md font-medium text-rose-600">
                                    Notes for this moment
                                </h4>
                                <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-transparent"></div>
                            </div>
                            
                            {obj.notes && obj.notes.length!=0? (
                                <div className="space-y-2">
                                    {obj.notes.map((note, noteIndex) => (
                                        <div key={noteIndex} className="ml-4">
                                            <Note note={note.note}/>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="ml-4 p-4 bg-pink-50/50 rounded-lg border border-pink-100">
                                    <div className="flex items-center space-x-2 text-pink-400">
                                        <span className="text-sm">💕</span>
                                        <p className="text-sm italic">
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Decorative bottom border */}
                        <div className="mt-6 flex justify-center space-x-2">
                            <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-rose-300 rounded-full animate-pulse delay-200"></div>
                            <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-400"></div>
                        </div>
                    </div>
                ))}
            </div>
        ):(
            <div className="text-center py-12">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-8">
                    <div className="text-6xl mb-4 text-pink-300">📸</div>
                    <h3 className="text-xl font-semibold text-rose-700 mb-2">
                        No Images Found
                    </h3>
                    <p className="text-rose-600 mb-4">
                        Start creating beautiful memories by uploading your first image! 💕
                    </p>
                    <div className="flex justify-center space-x-2">
                        <span className="text-pink-400 animate-pulse">💔</span>
                        <span className="text-rose-400 animate-pulse delay-200">📷</span>
                        <span className="text-pink-400 animate-pulse delay-400">💔</span>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default AllImages

// import React from 'react'
// import Image from './Image.jsx'
// import Note from "../Note/Note.jsx"
// import AddNote from "../Note/AddNote.jsx"

// function AllImages({ data,albumId,helperFetch }) {
//   console.log('Inside AllImages data : '+JSON.stringify(data));
     
//   return (
//     <div className="space-y-6">
//         {data && data.length!=0?(
//             <div className="grid grid-cols-1 gap-8">
//                 {data.map((obj, index) => (
//                     <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-6 hover:shadow-xl transition-all duration-300">
//                         {/* Resource Header */}
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="flex items-center space-x-2">
//                                 <span className="text-2xl">📸</span>
//                                 <h3 className="text-lg font-semibold text-rose-700">
//                                     Memory #{index + 1}
//                                 </h3>
//                             </div>
//                             <div className="text-xs text-pink-500 bg-pink-100 px-3 py-1 rounded-full font-medium">
//                                 {obj.resource?.format?.toUpperCase() || 'Media'}
//                             </div>
//                         </div>

//                         {/* Image Display */}
//                         <div className="mb-6">
//                             <div className="rounded-xl overflow-hidden shadow-md border-2 border-pink-200">
//                                 <Image imageUrl={obj.resource?.secure_url}/>
//                             </div>
//                         </div>

//                         {/* Notes Section */}
//                         <div className="space-y-3">
//                                   <AddNote albumId={albumId} resourceId={obj.resource?._id} helperFetch={helperFetch}/>
//                             <div className="flex items-center space-x-2 mb-3">
//                                 <span className="text-lg">💭</span>
//                                 <h4 className="text-md font-medium text-rose-600">
//                                     Notes for this moment
//                                 </h4>
//                                 <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-transparent"></div>
//                             </div>
                            
//                             {obj.notes && obj.notes.length!=0? (
//                                 <div className="space-y-2">
//                                     {obj.notes.map((note, noteIndex) => (
//                                         <div key={noteIndex} className="ml-4">
//                                             <Note note={note.note}/>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="ml-4 p-4 bg-pink-50/50 rounded-lg border border-pink-100">
//                                     <div className="flex items-center space-x-2 text-pink-400">
//                                         <span className="text-sm">💕</span>
//                                         <p className="text-sm italic">
//                                         </p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Decorative bottom border */}
//                         <div className="mt-6 flex justify-center space-x-2">
//                             <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
//                             <div className="w-2 h-2 bg-rose-300 rounded-full animate-pulse delay-200"></div>
//                             <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-400"></div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         ):(
//             <div className="text-center py-12">
//                 <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-8">
//                     <div className="text-6xl mb-4 text-pink-300">📸</div>
//                     <h3 className="text-xl font-semibold text-rose-700 mb-2">
//                         No Images Found
//                     </h3>
//                     <p className="text-rose-600 mb-4">
//                         Start creating beautiful memories by uploading your first image! 💕
//                     </p>
//                     <div className="flex justify-center space-x-2">
//                         <span className="text-pink-400 animate-pulse">💔</span>
//                         <span className="text-rose-400 animate-pulse delay-200">📷</span>
//                         <span className="text-pink-400 animate-pulse delay-400">💔</span>
//                     </div>
//                 </div>
//             </div>
//         )}
//     </div>
//   )
// }

// export default AllImages


// // import React from 'react'
// // import Image from './Image.jsx'
// // import Note from "../Note/Note.jsx"

// // function AllImages({ data }) {
// //   console.log('Inside AllImages data : '+JSON.stringify(data));
  
// //   // alert()
// //   return (
// //     <>
// //         {data && data.length!=0?(
// //             data.map((obj)=>
// //               <>
// //                   <Image imageUrl={obj.resource?.secure_url}/>
// //                   {obj.notes && obj.notes.length!=0?
// //                   (
// //                     obj.notes.map((note)=>
// //                     <>
// //                       <Note note={note.note}/>
// //                     </>)
// //                   ):
// //                   (<p></p>)
// //                   }
// //               </>
// //           )):(
// //           <p>Images not found</p>
// //         )}
// //     </>
// //   )
// // }

// // /*
// // function AllImages({ allImages }) {
// //   return (
// //     <div className="my-6">
// //       <h2 className="text-2xl font-semibold text-rose-600 mb-4 flex items-center">
// //         📸 Our Lovely Moments
// //       </h2>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //         {allImages && allImages.length!=0?allImages.map((imageUrl, index) => (
// //           <>
// //             <Image key={index} imageUrl={imageUrl} />
// //             {allImages.notes && allImages.notes.length!=0 ?  (
// //               allImages.notes.map((note)=>
// //                 <>
// //                   <Note note={note}/>
// //                 </>
// //               )
// //             ):(
// //               <span></span>
// //             )}
// //           </>
// //         )):(
// //           <p>Images not found</p>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }
// //   */

// // export default AllImages

// // // import React from 'react'
// // // import Image from './Image.jsx'

// // // function AllImages({allImages}) {
// // //   return (
// // //     <>
// // //       <p>Images</p>
// // //       {allImages.map(imageUrl=>
// // //         <Image imageUrl={imageUrl}/>
// // //       )}
// // //     </>
// // //   )
// // // }

// // // export default AllImages
