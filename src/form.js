import React from "react";
import { useForm } from 'react-hook-form';
import Data from './../src/data/dog_kind.json';

export function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
  });
  const onSubmit = (data) => {
    props.onFormSubmit(data);
  }
  let existedData = Data.filter((data) => (
    data.name != ''
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="column">
        <div className="columns is-mobile">
          <div className="column is-half">
            <div className="field">
              <label className="label">ペットの種類</label>
              <div className="control is-expanded">
                <div className="select is-focused is-info">
                  <select {...register("animalKind", { required: true })} defaultValue="terrier-american">
                    {existedData.map((data) => {
                      return (
                        <option key={data.name} value={data.value}>{data.name}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field">
              <label className="label">ペットの年齢（年）</label>
              <div className="control is-expanded">
                <input
                  className="input is-rounded is-focused is-info"
                  {...register('petAge', { min: 0, max: 22, required: true })}
                />
                {errors.petAge && "0から22才の間で入力してください"}
              </div>
            </div>
            <div className="field">
              <label className="label">年に何回いっしょに遊びますか？</label>
              <div className="control is-expanded">
                <input
                  className="input is-rounded is-focused is-info"
                  {...register('numberOfPlay', { required: true })}
                />
                {errors.numberOfPlay && "遊ぶ回数を入力してください"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="column has-text-centered">
        <div className="control">
          <button type="submit" className="button is-primary">
            結果
          </button>
        </div>
      </div>
    </form>
  )
}
