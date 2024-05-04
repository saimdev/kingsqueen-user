

const RecursiveCheckbox = ({ data, ulKey = '', ulClass = "", catCheckedValues = [], onChangeHandler = ()=>{} }) => {
    return (
        <ul key={ulKey} className={`list-none ${ulClass}`}>
            {data.length > 0 ? (
                data.map((item, index) => {
                    const liKey = `${ulKey}_li_${index}`;
                    return (
                        <li key={liKey} className="relative my-1">
                            <label key={'label_' + liKey} className="flex items-center gap-2">
                                <input type="checkbox" key={liKey} onChange={onChangeHandler} checked={catCheckedValues.includes(item.slug)} name="categoriest[]" value={item.slug} /> {item.name}
                            </label>
                            {item.children?.length > 0 ? (
                                <RecursiveCheckbox ulKey={liKey} data={item.children} ulClass="translate-x-4" catCheckedValues={catCheckedValues} onChangeHandler={onChangeHandler} />
                            ) : ''}
                        </li>
                    );
                })
            ) : ''}
        </ul>
    );
}

export default RecursiveCheckbox;