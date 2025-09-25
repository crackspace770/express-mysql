const dbPool = require('../config/database.js');

const getAllPenjualan = () => {
    const SQLQuery = `
    SELECT 
    p.id_penjualan,
    p.id_kasir,
    p.total_harga,
    p.metode_bayar,
    p.tgl_penjualan,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id_detail', d.id_detail,
            'id_product', d.id_product,
            'quantity', d.quantity,
            'harga', d.harga_satuan
        )
    ) AS detail_barang
    FROM tabel_penjualan p
    LEFT JOIN penjualan_detail d ON p.id_penjualan = d.id_penjualan
    GROUP BY p.id_penjualan, p.id_kasir, p.total_harga, p.metode_bayar, p.tgl_penjualan, nama_kasir, id_kasir;
    `;
    return dbPool.execute(SQLQuery);
}

const getPenjualanById = (id) => {
    const SQLQuery = 
    `
    SELECT 
    p.id_penjualan,
    p.id_kasir,
    p.total_harga,
    p.metode_bayar,
    p.tgl_penjualan,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id_detail', d.id_detail,
            'id_product', d.id_product,
            'quantity', d.quantity,
            'harga', d.harga
        )
    ) AS detail_barang
    FROM tabel_penjualan p
    LEFT JOIN tabel_penjualan_detail d 
    ON p.id_penjualan = d.id_penjualan
    WHERE p.id_penjualan = ?
GROUP BY 
    p.id_penjualan, 
    p.id_kasir, 
    p.total_harga, 
    p.metode_bayar, 
    p.tgl_penjualan;
    `;
    return dbPool.execute(SQLQuery, [id]);
}

const createPenjualanWithDetail = async (penjualan, detail_barang) => {
    const connection = await dbPool.getConnection(); // ambil koneksi manual
    try {
        await connection.beginTransaction();

        // Insert ke tabel_penjualan
        const SQLPenjualan = `
            INSERT INTO tabel_penjualan 
            (id_penjualan, id_kasir, total_harga, metode_bayar, tgl_penjualan)
            VALUES (?, ?, ?, ?, ?)
        `;
        await connection.execute(SQLPenjualan, [
            penjualan.id_penjualan,
            penjualan.id_kasir,
            penjualan.total_harga,
            penjualan.metode_bayar,
            penjualan.tgl_penjualan
        ]);

        // Insert ke tabel_penjualan_detail (loop array)
        const SQLDetail = `
            INSERT INTO tabel_penjualan_detail 
            (id_penjualan, id_product, quantity, harga)
            VALUES (?, ?, ?, ?)
        `;
        for (const item of detail_barang) {
            await connection.execute(SQLDetail, [
                penjualan.id_penjualan,
                item.id_product,
                item.quantity,
                item.harga
            ]);
        }

        await connection.commit();
        connection.release();
        return { success: true };
    } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
    }
};

const updatePenjualan = (id, data) => {
    const SQLQuery = 'UPDATE tabel_penjualan SET field1 = ?, field2 = ? WHERE id = ?';
    return dbPool.execute(SQLQuery, [data.field1, data.field2, id]);
}

const deletePenjualan = (id) => {
    const SQLQuery = 'DELETE FROM tabel_penjualan WHERE id = ?';
    return dbPool.execute(SQLQuery, [id]);
}

module.exports = {
    getAllPenjualan,
    getPenjualanById,
    createPenjualanWithDetail,
    updatePenjualan,
    deletePenjualan
};