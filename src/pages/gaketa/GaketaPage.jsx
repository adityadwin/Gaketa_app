import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getAllPosts } from "../../services/index/posts";
import GaketaCardSkeleton from "../../components/GaketaCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import GaketaCard from "../../components/GaketaCard";
import MainLayout from "../../components/MainLayout";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import Search from "../../components/Search";
import Footer from "../../components/Footer";

let isFirstRun = true;

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsValue = Object.fromEntries([...searchParams]);

  const currentPage = parseInt(searchParamsValue?.page) || 1;
  const searchKeyword = searchParamsValue?.search || "";

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage, 6),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  console.log(data);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [currentPage, searchKeyword, refetch]);

  const handlePageChange = (page) => {
    // change the page's query string in the URL
    setSearchParams({ page, search: searchKeyword });
  };

  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ page: 1, search: searchKeyword });
  };

  return (
    <MainLayout>
      <section className="container mx-auto flex flex-col bg-[#F6F5F2] px-5 py-10">
        <Search
          className="mb-10 w-full max-w-xl"
          onSearchKeyword={handleSearch}
        />
        <div className=" flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
          {isLoading || isFetching ? (
            [...Array(3)].map((item, index) => (
              <GaketaCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the posts data" />
          ) : data?.data.length === 0 ? (
            <p className="text-orange-500">No Posts Found!</p>
          ) : (
            data?.data.map((post) => (
              <GaketaCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          )}
        </div>
        {!isLoading && (
          <Pagination
            onPageChange={(page) => handlePageChange(page)}
            currentPage={currentPage}
            totalPageCount={
              data?.headers?.["x-totalpagecount"]
                ? JSON.parse(data.headers["x-totalpagecount"])
                : 0
            }
          />
        )}
      </section>
      <Footer />
    </MainLayout>
  );
};

export default BlogPage;
