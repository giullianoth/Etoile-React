import { PiNotePencil, PiPlusCircle, PiTrash } from "react-icons/pi"
import styles from "./List.module.css"
import Checkbox from "../../../../Form/Checkbox"

const Categories = () => {
    return (
        <section>
            <header className={styles.plates__title}>
                <h2>Lista de categorias</h2>

                <button className="button primary small">
                    <PiPlusCircle />
                    Nova categoria
                </button>
            </header>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th className="centered">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <Checkbox className={styles.plate__checkbox} />
                        </td>

                        <td>
                            <span className="label-on-cell">
                                <strong>Categoria:</strong>&nbsp;
                            </span>
                            Entradas
                        </td>

                        <td>
                            <span className="label-on-cell">
                                <strong>Descrição:</strong>&nbsp;
                            </span>
                            A fresh mixed seafood salad with cooked...
                        </td>

                        <td className="centered">
                            <p className={styles.plate__actions}>
                                <button className="button clear" title="Editar prato">
                                    <PiNotePencil />
                                </button>

                                <button className="button clear" title="Excluit prato">
                                    <PiTrash />
                                </button>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Checkbox className={styles.plate__checkbox} />
                        </td>

                        <td>
                            <span className="label-on-cell">
                                <strong>Categoria:</strong>&nbsp;
                            </span>
                            Entradas
                        </td>

                        <td>
                            <span className="label-on-cell">
                                <strong>Descrição:</strong>&nbsp;
                            </span>
                            A fresh mixed seafood salad with cooked...
                        </td>

                        <td className="centered">
                            <p className={styles.plate__actions}>
                                <button className="button clear" title="Editar prato">
                                    <PiNotePencil />
                                </button>

                                <button className="button clear" title="Excluit prato">
                                    <PiTrash />
                                </button>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Checkbox className={styles.plate__checkbox} />
                        </td>

                        <td>
                            <span className="label-on-cell">
                                <strong>Categoria:</strong>&nbsp;
                            </span>
                            Entradas
                        </td>

                        <td>
                            <span className="label-on-cell">
                                <strong>Descrição:</strong>&nbsp;
                            </span>
                            A fresh mixed seafood salad with cooked...
                        </td>

                        <td className="centered">
                            <p className={styles.plate__actions}>
                                <button className="button clear" title="Editar prato">
                                    <PiNotePencil />
                                </button>

                                <button className="button clear" title="Excluit prato">
                                    <PiTrash />
                                </button>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Categories