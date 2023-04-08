import { ClientOnly } from "./ClientOnly";
import getCurrentUser from "./actions/getCurrentuser";
import getListings, { IListing } from "./actions/getListings";
import { Container } from "./components/Container";
import { EmptyState } from "./components/EmptyState";
import ListingCard from "./components/listing/ListingCard";

interface HomeProps{
   searchParams : IListing
}

export default async function Home({searchParams} : HomeProps) {
  const isEmpty = true;

  const listing = await getListings(searchParams);
  const currentuser = await getCurrentUser();

  if(listing.length === 0) {
    return(
      <ClientOnly>
        <EmptyState resetFilter/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="
          grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        ">
        {
          listing.map((list)=>(
            <ListingCard
              currentUser={currentuser} 
              data={list}
              key={list.id}
            />
          ))
        }
        </div>
      </Container>
    </ClientOnly>   
  )
}
