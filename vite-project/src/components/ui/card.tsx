import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-b-sm py-6 shadow-sm",
        className
      )}
      style={{ backgroundColor: "lightgray", borderColor: "lightgray", padding: "0px", borderRadius: "9px", boxShadow: "0px 1.794px 1.794px 0px rgba(0, 0, 0, 0.25)" }}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}


          // <div className={`transition-all duration-300 ease-in-out flex-shrink-0 ${
          //   selectedMovie ? 'w-[45%] opacity-100' : 'w-0 opacity-0'
          // } overflow-hidden relative z-30`}>
          //   {selectedMovie && (
          //     <div className="w-full h-full pr-4">
          //       <Card className="bg-gray-900/80 border-gray-700 h-full rounded-xl shadow-2xl">
          //         <CardContent className="p-6 h-full flex flex-col">
          //           <div className="absolute top-4 right-4">
          //             <Button 
          //               variant="ghost" 
          //               size="icon"
          //               onClick={() => setSelectedMovie(null)}
          //               className="text-gray-400 hover:text-white"
          //             >
          //               <X className="h-5 w-5" />
          //             </Button>
          //           </div>
                    
          //           <div className="flex gap-6 h-full">
          //             {/* Movie Poster */}
          //             <div className="w-1/3">
          //               <img 
          //                 src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} 
          //                 alt={selectedMovie.title}
          //                 className="w-full h-auto rounded-lg shadow-lg"
          //               />
          //             </div>
                      
          //             {/* Movie Details */}
          //             <div className="w-2/3 flex flex-col">
          //               <h1 className="text-3xl font-bold text-white mb-2">{selectedMovie.title}</h1>
          //               <div className="flex items-center gap-2 mb-4">
          //                 <span className="text-green-500 font-medium">{selectedMovie.vote_average}/10</span>
          //                 <span className="text-gray-400">•</span>
          //                 <span className="text-gray-400">{selectedMovie.runtime} mins</span>
          //                 <span className="text-gray-400">•</span>
          //                 <span className="text-gray-400">{selectedMovie.release_date.substring(0, 4)}</span>
          //               </div>
                        
          //               <div className="flex flex-wrap gap-2 mb-4">
          //                 {selectedMovie.genres.map(genre => (
          //                   <span key={genre.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
          //                     {genre.name}
          //                   </span>
          //                 ))}
          //               </div>
                        
          //               <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
          //               <p className="text-gray-300 mb-6">{selectedMovie.overview}</p>
                        
          //               <div className="mt-auto">
          //                 <h3 className="text-xl font-semibold text-white mb-2">Details</h3>
          //                 <div className="grid grid-cols-2 gap-4 text-sm">
          //                   <div>
          //                     <p className="text-gray-400">Original Title</p>
          //                     <p className="text-white">{selectedMovie.original_title}</p>
          //                   </div>
          //                   <div>
          //                     <p className="text-gray-400">Status</p>
          //                     <p className="text-white">{selectedMovie.status}</p>
          //                   </div>
          //                   <div>
          //                     <p className="text-gray-400">Budget</p>
          //                     <p className="text-white">${selectedMovie.budget.toLocaleString()}</p>
          //                   </div>
          //                   <div>
          //                     <p className="text-gray-400">Revenue</p>
          //                     <p className="text-white">${selectedMovie.revenue.toLocaleString()}</p>
          //                   </div>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //         </CardContent>
          //       </Card>
          //     </div>
          //   )}
          // </div>


          //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          //     {/* Recommendation Card */}
          //     <Card className="bg-gray-900/70 border-gray-700 hover:border-green-500 transition-all backdrop-blur-sm">
          //       <CardContent className="p-6 flex flex-col items-center text-center">
          //         <div className="bg-green-900/30 p-4 rounded-full mb-4">
          //           <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          //           </svg>
          //         </div>
          //         <h3 className="text-xl font-semibold text-white mb-2">Personalized Recommendations</h3>
          //         <p className="text-gray-300">Get smart suggestions based on your unique taste profile</p>
          //       </CardContent>
          //     </Card>

          //     {/* Other cards remain similar but with bg-gray-900/70 */}
          //     {/* Rate & Review Card */}
          //     <Card className="bg-gray-900/70 border-gray-700 hover:border-green-500 transition-all backdrop-blur-sm">
          //       <CardContent className="p-6 flex flex-col items-center text-center">
          //   <div className="bg-green-900/30 p-4 rounded-full mb-4">
          //     <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          //     </svg>
          //   </div>
          //   <h3 className="text-xl font-semibold text-white mb-2">Rate & Review</h3>
          //   <p className="text-gray-400">Share your opinions and build your movie history</p>
          // </CardContent>
          //     </Card>

          //     {/* Track Card */}
          //     <Card className="bg-gray-900/70 border-gray-700 hover:border-green-500 transition-all backdrop-blur-sm">
          //       <CardContent className="p-6 flex flex-col items-center text-center">
          //   <div className="bg-green-900/30 p-4 rounded-full mb-4">
          //     <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          //     </svg>
          //   </div>
          //   <h3 className="text-xl font-semibold text-white mb-2">Track Your Films</h3>
          //   <p className="text-gray-400">Never forget what you've watched or want to watch</p>
          // </CardContent>
          //     </Card>

          //     {/* Collections Card */}
          //     <Card className="bg-gray-900/70 border-gray-700 hover:border-green-500 transition-all backdrop-blur-sm">
          //      <CardContent className="p-6 flex flex-col items-center text-center">
          //   <div className="bg-green-900/30 p-4 rounded-full mb-4">
          //     <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          //     </svg>
          //   </div>
          //   <h3 className="text-xl font-semibold text-white mb-2">Collections</h3>
          //   <p className="text-gray-400">Organize films into custom lists and categories</p>
          // </CardContent>
          //     </Card>
          //   </div>