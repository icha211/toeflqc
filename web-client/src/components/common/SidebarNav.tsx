import { useState, type FunctionComponent } from 'react';
import { ArrowRight, BarChart3, CalendarDays, Code2, House, LibraryBig, PanelLeftClose, Search } from 'lucide-react';
import logoMark from '../../assets/Logoqc_without name.png';
import logoWordmark from '../../assets/logoqcname.png';



type SidebarNavProps = {
	username?: string;
};

const SidebarNav: FunctionComponent<SidebarNavProps> = ({ username = 'User' }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const today = new Date();
	const todayLabel = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(today);
	const isDashboardActive = ['/', '/dashboard', '/views/DashboardView.tsx'].includes(window.location.pathname);

  	return (
    		<div className="w-full h-[900px] relative bg-aliceblue overflow-hidden flex flex-col items-start py-6 px-4 box-border gap-[196px] text-left text-num-16 text-darkgray font-inter">
	   			<div className="self-stretch flex flex-col items-start gap-6 shrink-0">
					<div className="w-full flex items-center justify-between gap-4">
						<div className="logo flex min-w-0 items-center gap-[3px]">
							<img className="h-[32.4px] w-9 object-contain" src={logoMark} alt="Quick Check mark" />
							<img className="h-10 w-[130px] object-contain" src={logoWordmark} alt="Quick Check" />
						</div>
						<button
							type="button"
							className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white p-2.5 text-[#7A8FA6] shadow-[0px_2px_4px_rgba(0,_0,_0,_0.05)] transition-colors hover:text-[#50677F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A8FA6]"
							aria-label="Collapse sidebar"
						>
							<PanelLeftClose size={28} strokeWidth={2.5} aria-hidden="true" />
							<span className="pointer-events-none absolute left-[calc(100%+8px)] top-1/2 z-10 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray px-3 py-2 text-left text-sm font-semibold leading-[140%] text-darkgray opacity-0 shadow-[0px_2px_4px_rgba(0,_0,_0,_0.05)] transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
								Close Sidebar
							</span>
						</button>
					</div>
        						<form
        							className={`w-[218px] rounded-num-8 border-lavender border-solid border-[1px] box-border overflow-hidden flex items-center py-num-10 px-num-12 gap-2 text-[#3A4A5C] transition-colors focus-within:bg-white ${searchQuery ? 'bg-white' : 'bg-transparent'}`}
        							onSubmit={(event) => event.preventDefault()}
        						>
          							<Search className="h-5 w-5 shrink-0" size={20} strokeWidth={1.5} aria-hidden="true" />
          							<input
        								className="min-w-0 flex-1 bg-transparent text-num-16 leading-num-20 text-[#3A4A5C] outline-none placeholder:text-darkgray"
        								value={searchQuery}
        								onChange={(event) => setSearchQuery(event.target.value)}
        								placeholder="Search"
        								aria-label="Search"
        							/>
          							<button type="submit" className="shrink-0 text-[#3A4A5C]" aria-label="Submit search">
            								<ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
          							</button>
        						</form>
        				<div className="self-stretch flex flex-col items-start gap-2 text-gray">
            							<a
              								href="/dashboard"
              								className={`self-stretch rounded-num-8 overflow-hidden flex items-center py-num-10 pl-3.5 pr-num-12 shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A8FA6] ${isDashboardActive ? 'bg-white text-[#005FAA] shadow-[0px_2px_4px_rgba(0,_0,_0,_0.05)]' : 'text-gray hover:bg-white hover:text-[#50677F]'}`}
              								aria-current={isDashboardActive ? 'page' : undefined}
            							>
              								<div className="flex-1 flex items-center gap-2">
                									<House className="h-5 w-5 shrink-0" size={20} strokeWidth={1.5} aria-hidden="true" />
                									<span className="flex-1 leading-num-20">Dashboard</span>
              								</div>
            							</a>
           							<div className="self-stretch rounded-num-8 overflow-hidden flex items-center py-num-10 pl-3.5 pr-num-12 gap-2 shrink-0 text-gray">
             								<div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
               									<CalendarDays size={20} strokeWidth={1.5} aria-hidden="true" />
               									<span className="absolute top-[9px] text-[7px] font-semibold leading-none">{today.getDate()}</span>
             								</div>
             								<div className="flex-1 flex items-center text-left text-num-16 font-inter">
               									<div className="flex-1 relative leading-num-20">Today, {todayLabel}</div>
             								</div>
           							</div>
		           			<button
		             				type="button"
		             				className="group self-stretch rounded-num-8 overflow-hidden flex items-center py-num-10 px-num-12 shrink-0 text-left text-gray transition-colors hover:bg-white hover:text-steelblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steelblue"
		             				aria-label="Mock Test"
		           			>
		             				<LibraryBig className="h-5 w-5 shrink-0" size={20} strokeWidth={1.5} aria-hidden="true" />
		             				<span className="flex-1 leading-num-20">Mock Test</span>
		           			</button>
		           			<button
		             				type="button"
		             				className="group self-stretch rounded-num-8 overflow-hidden flex items-center py-num-10 px-num-12 gap-2 shrink-0 text-left text-gray transition-colors hover:bg-white hover:text-steelblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steelblue"
		             				aria-label="Practice Test"
		           			>
		             				<LibraryBig className="h-5 w-5 shrink-0" size={20} strokeWidth={1.5} aria-hidden="true" />
		             				<span className="flex-1 leading-num-20">Practice Test</span>
		           			</button>
          					<div className="w-[218px] hidden flex-col items-start gap-3 shrink-0">
            						<div className="self-stretch h-10 rounded-num-8 overflow-hidden shrink-0 flex items-center py-num-10 px-num-12 box-border" />
            						<div className="self-stretch h-10 shadow-[0px_1px_10px_rgba(209,_201,_235,_0.05)] rounded-num-8 overflow-hidden shrink-0 flex items-center py-num-10 pl-9 pr-num-12 box-border" />
            						<div className="self-stretch h-10 shadow-[0px_1px_10px_rgba(209,_201,_235,_0.05)] rounded-num-8 overflow-hidden shrink-0 flex items-center py-num-10 pl-9 pr-num-12 box-border" />
            						<div className="self-stretch h-10 shadow-[0px_1px_10px_rgba(209,_201,_235,_0.05)] rounded-num-8 overflow-hidden shrink-0 flex items-center py-num-10 pl-9 pr-num-12 box-border" />
          					</div>
		           			<button
		             				type="button"
		             				className="group self-stretch rounded-num-8 overflow-hidden flex items-center py-num-10 px-num-12 gap-2 shrink-0 text-left text-gray transition-colors hover:bg-white hover:text-steelblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steelblue"
		             				aria-label="My Progress"
		           			>
		             				<BarChart3 className="h-5 w-5 shrink-0" size={20} strokeWidth={1.5} aria-hidden="true" />
		             				<span className="flex-1 leading-num-20">My Progress</span>
		           			</button>
          					<div className="relative text-[14px] leading-[140%] font-semibold text-darkslategray-100 shrink-0">ADMIN</div>
		           			<button
		             				type="button"
		             				className="group self-stretch rounded-num-8 overflow-hidden flex items-center py-num-10 px-num-12 shrink-0 text-left text-gray transition-colors hover:bg-white hover:text-steelblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steelblue"
		             				aria-label="Developer"
		           			>
		             				<Code2 className="h-5 w-5 shrink-0" size={20} strokeWidth={1.5} aria-hidden="true" />
		             				<span className="flex-1 leading-num-20">Developer</span>
		           			</button>
          					<div className="w-[218px] h-10 rounded-num-8 overflow-hidden shrink-0 hidden items-center py-num-10 px-num-12 box-border" />
          					<div className="w-[218px] h-10 rounded-num-8 overflow-hidden shrink-0 hidden items-center py-num-10 px-num-12 box-border" />
        				</div>
      			</div>
      			<div className="self-stretch flex flex-col items-start gap-5 shrink-0 text-gray">
        				<div className="self-stretch flex flex-col items-start gap-2">
          					<div className="self-stretch rounded-num-8 overflow-hidden flex items-center py-num-10 px-num-12">
            						<div className="flex-1 flex items-center gap-2">
              							<div className="flex items-start">
                								<img className="h-5 w-5 relative" alt="" />
              							</div>
              							<div className="flex-1 relative leading-num-20">Setting</div>
            						</div>
          					</div>
          					<div className="self-stretch rounded-num-8 overflow-hidden flex items-center py-num-10 px-num-12">
            						<div className="flex-1 flex items-center gap-2">
              							<div className="flex items-start">
                								<img className="h-5 w-5 relative object-cover" alt="" />
              							</div>
              							<div className="flex-1 relative leading-num-20">Notifications</div>
            						</div>
          					</div>
        				</div>
        				<img className="self-stretch h-px relative max-w-full overflow-hidden max-h-full" alt="" />
        				<div className="self-stretch flex items-center justify-between py-0 pl-0 pr-1 gap-5">
          					<div className="flex items-center gap-3">
            						<img className="h-12 w-12 relative rounded-[100px] object-cover" alt="" />
            						<div className="flex flex-col items-start justify-center gap-1">
               											<div className="relative leading-num-20">{username}</div>
              							<div className="relative text-[12px] leading-4 text-darkgray">Trial</div>
            						</div>
          					</div>
          					<div className="flex items-start">
            						<img className="h-[18px] w-[18px] relative object-cover" alt="" />
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default SidebarNav ;
