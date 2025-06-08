"use client";
import LiveChatScript from "@components/LiveChat";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Grid,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [active, setActive] = useState("popular");
  const [movies, setMovies] = useState();

  const getRandomMovies = (movies, count) => {
    const shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const TMDB_API_KEY = " d70595ef3e351a97e5665f2de45fcd45";
    const TMDB_ACCESS_TOKEN =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzA1OTVlZjNlMzUxYTk3ZTU2NjVmMmRlNDVmY2Q0NSIsInN1YiI6IjY2NzA0MWQ0ODRmMDE5YTBlYWExYjcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-M4AqRw0LtobEQ4YQ-eAxJxaSz8ym__7cLqyry-7Uvk";
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${active}`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            },
            params: {
              api_key: TMDB_API_KEY,
              // sort_by: "popularity.desc", // You can modify this to fetch movies based on different criteria
              page: 1, // Fetch the first page of results
            },
          }
        );

        const randomMovies = getRandomMovies(data?.results, 12);
        const movieData = randomMovies.map((movie) => ({
          name: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average,
        }));
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [active]);

  const [bronzV, setBronzV] = useState(true);
  const [silverV, setSilverV] = useState(true);
  const [goldV, setGoldV] = useState(true);
  const [diamondV, setDiamondV] = useState(true);

  const handleToggle = (type) => {
    if (type === "bronze") {
      setBronzV((prev) => !prev);
      return;
    }
    if (type === "silver") {
      setSilverV((prev) => !prev);
      return;
    }
    if (type === "gold") {
      setGoldV((prev) => !prev);
      return;
    }
    if (type === "diamond") {
      setDiamondV((prev) => !prev);
      return;
    }
  };

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#8075ff",
        }}
      >
        <CircularProgress style={{ color: "#CDC5B4" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <div className="card p-3">
          <div className="card-body p-3"></div>

          <h4>RULES</h4>

          <h5> RULES @ ACTIVE STORE</h5>

          <h6>
            {" "}
            These rules will help to establish clear guidelines and conditions
            for customers of accounts in our store. It is important that
            customers are aware of all the terms and conditions before making a
            purchase to avoid misunderstandings and conflicts in the future.
            <br />
            <br /> When buying a product on the ACTIVE STORE website, you
            automatically agree to the following rules:
          </h6>
          <br />
          <br />

          <ul>
            <li>
              The warranty on the product is 30 minutes from the date of its
              purchase, subject to compliance with all the rules and conditions
              of working with accounts. This means that if you have problems
              with your account within the first 30 minutes after purchase and
              you have followed all the instructions and rules, the store
              guarantees the replacement or return of the goods.
            </li>
            <li>
              The purchased valid item cannot be returned or replaced. In this
              case, if you purchased an account that is valid and functional,
              but later changed your mind or changed your mind, the store will
              not give you the opportunity to return or replace this product.
              Therefore, it is recommended to read the description carefully
              before buying.
            </li>
            <li>
              If the accounts cannot be replaced, the store will give you the
              opportunity to return the money. If you encounter a situation
              where accounts cannot be replaced for any reason (for example,
              they have been deleted or blocked), the store will refund you the
              amounts paid.
            </li>
            <li>
              If you plan to use the purchased accounts for a long time, you
              must regularly change passwords and take care of the security of
              accounts yourself. This is important to protect your interests and
              prevent unauthorized access to accounts. The store is not
              responsible for problems related to the security of accounts after
              their purchase.
            </li>
            <li>
              Before buying, carefully read the product description and check
              its characteristics to make sure that it meets your needs and
              requirements. The store provides descriptions of products and
              their characteristics, and you should pay attention to them to
              make sure that the product you have chosen is suitable for your
              needs.
            </li>
            <li>
              If you have any problems with your order, contact the store's
              technical support as soon as possible to solve the problem.
            </li>
            <li>
              Technical support of the store will respond to your requests
              within 24 hours of contacting us. If you have any questions,
              problems or need help, you can contact the technical support of
              the store, and we will try to answer you as soon as possible.
            </li>
            <li>
              The store does not provide training or advice on the use of
              accounts. The store is only responsible for the provision and
              operation of accounts, but is not responsible for teaching you how
              to use accounts or for consulting on related issues. Therefore, if
              you have any questions about the use of accounts, it is
              recommended that you contact other sources of information or
              experts in this field.
            </li>
            <br />
            <br />

            <h6>
              Follow the recommendations for working with accounts to ensure
              security and efficiency:
            </h6>
            <br />
            <br />

            <h6>Use high-quality proxy servers.</h6>
            <li>
              Problem: If you log in to multiple accounts from the same IP
              address, all your accounts can be blocked
            </li>
            <li>
              Solution: Use quality proxy servers, such as individual IPv4
              proxies or Resident proxies. Avoid using package proxies and
              browser extensions such as Hola, FreeVPN, etc. It is also not
              recommended to use an IPv6 proxy.
            </li>

            <br />
            <br />

            <h6> Use different devices to log in to different accounts.</h6>
            <li>
              {" "}
              Problem: If you log in to multiple accounts from one device
              (computer, phone, tablet), all your accounts can be blocked.
            </li>
            <li>
              {" "}
              Solution: Use different devices or specialized programs and
              services to work with different accounts. A regular browser
              window, incognito mode or clearing cookies are not considered
              different devices.
            </li>

            <br />
            <br />

            <h6> What are different devices: </h6>
            <li> computer, second computer</li>
            <li> phone, second phone</li>
            <li> profile program for logging in to accounts</li>
            <li>
              {" "}
              change of UserAgent in the browser and other actions with the
              browser
            </li>
            <li>
              {" "}
              the use of special browsers that change these devices themselves.
            </li>

            <br />
            <br />

            <h6> Observe limits and conduct human-like activities. </h6>
            <li>
              {" "}
              Problem: If you immediately start actively working with accounts
              (mass likes, mass messaging, etc.), your accounts can be quickly
              blocked.
            </li>
            <li>
              Solution: For safe work with accounts, it is recommended to first
              perform some of the usual actions that a real user usually does
              when registering.
            </li>
            <li>
              {" "}
              Example: Fill out a profile, subscribe to several users, leave a
              few likes, add a few photos, make reposts, comments, etc.
            </li>

            <br />
            <br />

            <h5>
              {" "}
              It is important to note that we are not responsible for developers
              of programs, services and proxy providers. All accounts registered
              by us or our partners are created using private software, programs
              that are not available to the public, and proxy servers.
            </h5>
          </ul>
        </div>
      </NavPage>
    );
}
