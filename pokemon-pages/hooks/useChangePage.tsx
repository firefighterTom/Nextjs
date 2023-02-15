import { NextRouter } from 'next/router';


export function useChangePage(symbol:string,router:NextRouter,pageNumber:number){
	
		if (symbol === '+') {
			router.push(`/pokemon/${pageNumber + 1}`);
           
		}
		if (symbol === '-') {
			router.push(`/pokemon/${pageNumber - 1}`);
           
		}
      
	};

