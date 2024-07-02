import axios from "axios";
import { ArrowBigLeft, ArrowBigRight, ArrowLeft, ArrowRight, Book, Loader2, Play } from "lucide-react";
import { useEffect, useState } from "react";


const App = () => {
    const [App, setApp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [AppPerPage] = useState(12); 
    const [selectedCategory, setSelectedCategory] = useState('All'); 
  
    useEffect(() => {
      getPosts();
    }, []);
  
    const getPosts = async () => {
      setLoading(true);
      await axios.get(`https://arthurfrost.qflo.co.za/php/getTimeline.php`).then((response) => {
        setApp(response.data.Timeline);
      }).catch((response) => {
        console.log("There was an error fetching data", response);
      }).finally(() => {
        setLoading(false);
      });
    };
  
    // Get current App based on pagination
    const indexOfLastPost = currentPage * AppPerPage;
    const indexOfFirstPost = indexOfLastPost - AppPerPage;
    const currentApp = App.slice(indexOfFirstPost, indexOfLastPost);
  
    // Filter App based on selected category
    const filteredApp = selectedCategory === 'All'
      ? currentApp
      : currentApp.filter(post => post.Category === selectedCategory);
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(App.length / AppPerPage);
  
    // Get unique categories for filtering
    const uniqueCategories = [...new Set(App.map(post => post.Category))];
  
    return (
      <div className='flex flex-col gap-2'>
         <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
         <p className='flex z-40 font-semibold  text-xl p-2 '>GRC <span className='text-red-600'>Podcasts</span></p>

         </nav>
        <h1 className='text-4xl text-center mb-5'>GRC Podcasts</h1>
        
        {/* Category Filter */}
        <div className='mb-4 p-4'>
          <label htmlFor="category" className='mr-2'>Filter by Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='p-2 border rounded'
          >
            <option value="All">All</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
  
        {!loading ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 border-b-red-100 p-2">
              {filteredApp && filteredApp.map((post) => (
                <div key={post.Id} className="group hover:shadow-sm transition overflow-auto border rounded-lg p-3 h-full">
                  <h2 className='text-start my-2'>{post.Title}</h2>
                  <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <img src={post.Image.includes(`Images`) ? `https://arthurfrost.qflo.co.za/${post.Image}` :  `https://arthurfrost.qflo.co.za/Images/${post.Image}`} alt='media image' className='w-full h-full' />
                  </div>
                  <div className="flex gap-2 mt-5">
                    <audio controls>
                      <source src={`https://arthurfrost.qflo.co.za/${post.Audio}`} type='audio/mpeg' />
                    </audio>
                  </div>
                  <div className="my-2 gap-4">
                    <div className="text-lg md:text-base font-medium  cursor-pointer flex gap-2 items-center mb-4">
                      <img src={post.Icon.includes(`Images`) ? `https://arthurfrost.qflo.co.za/${post.Icon}` :  `https://arthurfrost.qflo.co.za/Images/${post.Icon}`} alt='Icon image' className='w-12 h-12 rounded-full' />
                      Episode {post.Episode}
                    </div>
                    <p className='text-md text-muted-foreground text-red-500 cursor-pointer flex gap-2'><Play /> {post.MediaName}</p>
                    <p className='text-sm text-muted-foreground group-hover:text-sky-700 transition cursor-pointer flex gap-2 my-2'><Book/> {post.Category}</p>
               
                  </div>
                  <p>posted at {post.CreateDate}</p>
                </div>
              ))}
            </div>
  
            {/* Pagination */}
            <div className='mt-4 flex justify-center items-center mb-5'>
              <button
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
                className='px-3 py-1 mx-1 bg-gray-200 disabled:opacity-50'
              >
                <ArrowBigLeft />
              </button>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-3 py-1 mx-1 bg-gray-200 disabled:opacity-50'
              >
                <ArrowLeft/>
              </button>
              <span className='mx-2'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-3 py-1 mx-1 bg-gray-200 disabled:opacity-50'
              >
                <ArrowRight/>
              </button>
              <button
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
                className='px-3 py-1 mx-1 bg-gray-200 disabled:opacity-50'
              >
                <ArrowBigRight />
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col justify-center ">
            Loading Podcasts please wait...

            <Loader2 className="h-20 w-20 animate-spin mt-20"/>
            </div>
        )}
      </div>
    );
  };
  
  export default App;
  