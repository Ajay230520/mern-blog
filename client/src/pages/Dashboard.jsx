import{ useEffect ,useState } from 'react'
import  {useLocation} from 'react-router-dom';
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashBoardComponent from '../components/DashBoardComponent';
export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(()=>{
    const urlPrams = new URLSearchParams(location.search)
    const tabFromUrl = urlPrams.get('tab')
    console.log(tabFromUrl);
    if(tabFromUrl){

      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

    <div className="md:w-56">
      {/* Side bar */}
      <DashSidebar/>
    </div>
    {/* Profile */}
    {
      tab === 'dash' && <DashBoardComponent/>
    }
      
      {
        tab === 'profile' && <DashProfile/>
      }
      {
        tab === 'posts' && <DashPosts/>
        
      }
      {/* Users.... */}
      {
          tab === 'users' && <DashUsers/>
      }
      {
        tab === 'comments' && <DashComments />
      }
    </div>
  )

}