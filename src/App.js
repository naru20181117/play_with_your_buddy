import React, { useEffect, useState } from "react";
import { fetchImages } from "./api";
import { calculateNumber } from "./calculate";
import background from "./image/background.jpeg";
import { useForm } from 'react-hook-form';

function Header() {
	return (
		<header className="hero is-small is-info is-hold">
			<div className="hero-body">
				<div className="container">
					<h1 className="title">家族と遊ぼう</h1>
				</div>
			</div>
		</header>
	);
}

function Image(props) {
	return (
		<div className="card">
      <div className="card-image">
        <figure className="image">
        <img src={props.src} alt="cute dog!" />
        </figure>
      </div>
    </div>
	);
}

function Loading() {
	return <p>Loading....</p>;
}

function Gallery(props) {
	const { urls } = props;
	if (urls == null) {
		return <Loading />
	}
	return (
		<div className="columns is-vcentered is-multiline">
			{urls.map((url) => {
				return (
					<div key={url} className="column is-3">
						<Image src={url} />
					</div>
				);
			})}
    </div>
	);
}

function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    props.onFormSubmit(data);
  }

	return (
		<div className="columns has-background-white is-mobile is-centered">
			<form onSubmit={handleSubmit(onSubmit)}>
        <div className="column">
          <div className="native-flex">
            <div className="field">
              <label className="label">ペットの種類</label>
              <div className="control is-expanded">
                <div className="select is-rounded is-focused is-info">
                  <select {...register("animalKind", { required: true })} defaultValue="shiba">
                    <option value="shiba">いぬ</option>
                    <option value="akita">ねこ</option>
                    <option value="african">アフリカの漢</option>
                    <option value="chow">ちゃうちゃう</option>
                    <option value="samoyed">さもえどちゃん</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">ペットの年齢（年）</label>
              <div className="control is-expanded">
                <input
                  className="input is-rounded is-focused is-info"
                  {...register('petAge', { min: 0, max: 30 })}
                />
                {errors.petAge && "0から30才の間で選んでください"}
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="native-flex">
            <div className="field">
              <label className="label">年に何回いっしょに遊びますか？</label>
              <div className="control is-expanded">
                <input
                  className="input is-rounded is-focused is-info"
                  {...register('numberOfPlay', { required: true })}
                />
                {errors.numberOfPlay && "遊ぶ回数を選んでください"}
              </div>
            </div>
          </div>
        </div>

        <div className="icon is-small is-left">
          <i className="fas fa-globe"></i>
        </div>
        <div className="control">
          <button type="submit" className="button is-primary">
            結果
          </button>
        </div>
			</form>
		</div>
	)
}

function Result(props) {
  const { resultNum } = props;
  return (
    <div className="columns is-vcentered">
      {resultNum}
    </div>
  );
}

function Main() {
	const [urls, setUrls] = useState(null);
  const [resultNum, setResultNum] = useState(null);
	useEffect(() => {
    fetchImages("shiba").then((urls) => {
      setUrls(urls);
    });
  }, []);

	function reloadResults(data) {
		fetchImages(data.animalKind).then((urls) => {
			setUrls(urls);
		});

    calculateNumber(data).then((resultNum) => {
      setResultNum(resultNum);
    });
	};
	return (
		<main>
			<section className="section">
				<div className="container">
					<Form onFormSubmit={reloadResults}/>
				</div>
        <div className="container">
					<Result resultNum={resultNum}/>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<Gallery urls={urls} />
				</div>
			</section>
		</main>
	);
}

function Footer() {
	return (
		<footer className="footer">
			<div className="content has-text-centered">
				<b>なぜやるか？</b>
				<p>
					僕自身ペットわんちゃんを飼ってきました。小さい頃から一緒に成長してきて家族同然に考えていました。
				</p>
        <p>
					しかし、中学生の頃体調が急変して亡くなってしまいます。
				</p>
        <p>
					今考えると犬の寿命は人よりも短く、寿命が近いのはわかりきったことでした。しかし、手遅れになって残ったのは大きな後悔の念だけです。
				</p>
        <p>
          もっと一緒に遊んであげたかった。そんな悔しい想いを抱く人を増やさないタメにも。一緒に遊んで欲しかったペットのためにもこのサイトを作っています。
				</p>
			</div>
		</footer>
	)
}

function App() {
  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center center",
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundColor: '#464646'
  }
	return (
		<div style={containerStyle}>
			<Header />
      <Main />
      <Footer />
    </div>
	);
}

export default App;
