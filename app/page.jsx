import Feed from '../components/Feed';

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text blue_gradient text-center'>
        Discover Your VibeMart Shopping Experience
        <br />
        <span className='orange_gradient text-center '>
          Style and Convenience
        </span>
      </h1>
      <p className='desc text-center '>
        Discover Your Vibrant Shopping Experience at VibeMart: Where Style and
        Convenience Meet in Perfect Harmony!"
      </p>
      <Feed />
    </section>
  );
};

export default Home;
