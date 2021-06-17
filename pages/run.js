import axios from "axios";

export default function Run({ data }) {
  return (
    <ul>
      {data.map((d, i) => (
        <li key={i}>{JSON.stringify(d)}</li>
      ))}
    </ul>
  );
}

export async function getServerSideProps(context) {
  // Temporary
  // token needs to be checked in a custom authenticate function in backend
  // because token is always in cookie if a user successfully login to the system.
  const cookie =
    "access_token" in context.req.cookies
      ? context.req.cookies.access_token
      : "";

  const config = {
    headers: {
      Authorization: "Bearer " + cookie.toString(),
      "Content-Type": "application/json",
      accept: "application/json",
      withCredentials: true,
    },
  };

  const res = await axios
    .get("http://localhost:8000/api/seq/run/", config)
    .then((res) => res)
    .catch((err) => err.response);

  if (res.status === 401 && !context.req) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 401,
      },
    };
  }

  if (res.status === 401 && context.req) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 302,
      },
    };
  }

  return {
    props: {
      data: res.data,
    },
  };
}
