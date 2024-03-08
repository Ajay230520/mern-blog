import {useState,useEffect} from 'react'
import {Sidebar} from 'flowbite-react';
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
import {useLocation} from 'react-router-dom'
import { Link } from 'react-router-dom';
export default function DashSidebar() {
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
    <Sidebar className='w-full md:w-56'>
       <Sidebar.Items >
        <Sidebar.ItemGroup >
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'}  icon={HiUser} label={'User'} labelColor='dark'>
                Profile
            </Sidebar.Item>
            </Link>
            <Sidebar.Item  icon={HiArrowSmRight}>
                Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
       </Sidebar.Items>
    </Sidebar>
  );
}
