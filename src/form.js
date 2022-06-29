import React from "react";
import { useForm } from 'react-hook-form';

export function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    props.onFormSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="column">
        <div className="columns is-mobile">
          <div className="column is-half">
            <div className="field">
              <label className="label">ペットの種類</label>
              <div className="control is-expanded">
                <div className="select is-focused is-info">
                  <select {...register("animalKind", { required: true })} defaultValue="shiba">
                    <option value="shiba">いぬ</option>
                    <option value="akita">ねこ</option>
                    <option value="samoyed">さもえどちゃん</option>
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
                  {...register('petAge', { min: 0, max: 30 })}
                />
                {errors.petAge && "0から30才の間で選んでください"}
              </div>
            </div>
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
