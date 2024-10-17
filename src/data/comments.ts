import { v4 as uuidv4 } from 'uuid';

const butterflyConvo = [
	{
		id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
		authorId: '3b1d8c27-66b7-4a3f-9b10-d9c7e7e6a26c',
		genomeId: '550e8400-e33b-41d4-a716-446655440022',
		postId: '',
		parentCommentId: '',
		content:
			'Has anyone seen the latest genome sequencing results for the Large Blue Butterfly?',
	},
	{
		id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
		authorId: '4a2d9c28-77b8-4b4f-8c11-e9d8e8e7b27d',
		genomeId: '550e8400-e33b-41d4-a716-446655440022',
		postId: '',
		parentCommentId: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
		content: 'Yes, I have! The results are fascinating. The level of detail is incredible.',
	},
	{
		id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
		authorId: '5b3e0d29-88c9-4c5f-9d12-f9e9f9f8c38e',
		genomeId: '550e8400-e33b-41d4-a716-446655440022',
		postId: '',
		parentCommentId: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
		content:
			'I agree. The insights into their genetic makeup could help with conservation efforts.',
	},
	{
		id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
		authorId: '6c4f1e2a-99da-4d6f-8e13-g9f0g0g9d49f',
		genomeId: '550e8400-e33b-41d4-a716-446655440022',
		postId: '',
		parentCommentId: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
		content: 'Does anyone know if there are any unique genetic traits found in this butterfly?',
	},
	{
		id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
		authorId: '7d5g2f2b-aaeb-4e7f-9f14-h0g1h1h0e50g',
		genomeId: '550e8400-e33b-41d4-a716-446655440022',
		postId: '',
		parentCommentId: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
		content:
			'Yes, there are several unique traits, including some that might explain their specific habitat preferences.',
	},
	{
		id: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
		authorId: '8e6h3g2c-bbfc-4f8f-8g15-i1h2i2i1f61h',
		genomeId: '550e8400-e33b-41d4-a716-446655440022',
		postId: '',
		parentCommentId: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
		content:
			"That's interesting. Could these traits be used to help protect their natural habitats?",
	},
	{
		id: '7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v',
		authorId: '9f7i4h2d-ccgd-4g9f-9h16-j2i3j3j2g72i',
		genomeId: '550e8400-e33b-41d4-a716-446655440022',
		postId: '',
		parentCommentId: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
		content:
			'Potentially, yes. Understanding their genetics can inform conservation strategies.',
	},
	{
		id: '8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w',
		authorId: '0g8j5i2e-ddhe-4h0f-8i17-k3j4k4k3h83j',
		genomeId: '550e8400-e33b-41d4-a716-446655440022',
		postId: '',
		parentCommentId: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
		content: 'I wonder if there are any implications for other species in the same habitat.',
	},
	{
		id: '9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x',
		authorId: '1h9k6j2f-eefi-4i1f-9j18-l4k5l5l4i94k',
		genomeId: '550e8400-e33b-41d4-a716-446655440022',
		postId: '',
		parentCommentId: '8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w',
		content:
			"That's a good point. The findings could indeed have broader ecological implications.",
	},
	{
		id: '0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y',
		authorId: '2i0l7k2g-ffgj-4j2f-8k19-m5l6m6m5j05l',
		genomeId: '550e8400-e33b-41d4-a716-446655440022',
		postId: '',
		parentCommentId: '9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x',
		content:
			'Absolutely. This research could pave the way for more comprehensive conservation efforts.',
	},
];

const werewolfConvo = [
	{
		id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
		authorId: '3j1m8l2h-gghk-4k3f-9l20-n6m7n7n6k16m',
		genomeId: '550e8400-f111-41d4-a716-446655440155',
		postId: '',
		parentCommentId: '',
		content: 'Has anyone analyzed the latest genome sequencing data for the werewolf specimen?',
	},
	{
		id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
		authorId: '4k2n9m2i-hhil-4l4f-8m21-o7n8o8o7l27n',
		genomeId: '550e8400-f111-41d4-a716-446655440155',
		postId: '',
		parentCommentId: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
		content:
			'Yes, the sequencing depth was impressive. The coverage across the genome is quite comprehensive.',
	},
	{
		id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
		authorId: '5v3y0x2t-sssx-4w5f-9x32-z8y9z9z8w38y',
		genomeId: '550e8400-f111-41d4-a716-446655440155',
		postId: '',
		parentCommentId: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
		content:
			'I noticed that too. The contig N50 is particularly high, which indicates a well-assembled genome.',
	},
	{
		id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
		authorId: '6w4z1y2u-ttty-4x6f-8y33-a9z0a0a9x49z',
		genomeId: '550e8400-f111-41d4-a716-446655440155',
		postId: '',
		parentCommentId: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
		content: 'Did anyone else find the high number of repetitive elements surprising?',
	},
	{
		id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
		authorId: '7x5a2z2v-uuuz-4y7f-9z34-b0a1b1b0y50a',
		genomeId: '550e8400-f111-41d4-a716-446655440155',
		postId: '',
		parentCommentId: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
		content:
			'Yes, the transposable elements were more abundant than expected. It could be a factor in their rapid adaptation.',
	},
	{
		id: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
		authorId: '8o6r3q2m-llmq-4p8f-8q25-s1r2s2s1p61r',
		genomeId: '550e8400-f111-41d4-a716-446655440155',
		postId: '',
		parentCommentId: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
		content:
			'The gene annotation also revealed several unique metabolic pathways. Could these be linked to their nocturnal behavior?',
	},
	{
		id: '7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v',
		authorId: '9z7c4b2x-wwwb-4a9f-9b36-d2c3d3d2a72c',
		genomeId: '550e8400-f111-41d4-a716-446655440155',
		postId: '',
		parentCommentId: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
		content:
			"It's possible. The expression of these genes under different light conditions would be an interesting study.",
	},
	{
		id: '8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w',
		authorId: '0a8d5c2y-xxxc-4b0f-8c37-e3d4e4e3b83d',
		genomeId: '550e8400-f111-41d4-a716-446655440155',
		postId: '',
		parentCommentId: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
		content:
			'I wonder if the high GC content in certain regions has any functional significance.',
	},
	{
		id: '9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x',
		authorId: '1b9e6d2z-yyyd-4c1f-9d38-f4e5f5f4c94e',
		genomeId: '550e8400-f111-41d4-a716-446655440155',
		postId: '',
		parentCommentId: '8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w',
		content:
			"That's a good point. It might be related to the stability of the DNA in different environmental conditions.",
	},
	{
		id: '0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y',
		authorId: '2c0f7e2a-zzze-4d2f-8e39-g5f6g6g5d05f',
		genomeId: '550e8400-f111-41d4-a716-446655440155',
		postId: '',
		parentCommentId: '9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x',
		content:
			'Absolutely. Further functional genomics studies could shed light on these aspects.',
	},
];

const toadConvo = [
	{
		id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
		authorId: '3b1d8c27-66b7-4a3f-9b10-d9c7e7e6a26c',
		genomeId: '550e8400-e77b-41d4-a716-446655440066',
		postId: '',
		parentCommentId: '',
		content: 'Has anyone reviewed the latest genome profile for the Common Toad?',
	},
	{
		id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
		authorId: '4a2d9c28-77b8-4b4f-8c11-e9d8e8e7b27d',
		genomeId: '550e8400-e77b-41d4-a716-446655440066',
		postId: '',
		parentCommentId: '',
		content: 'Yes, the assembly quality is remarkable. The contig N50 is quite high.',
	},
	{
		id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
		authorId: '5b3e0d29-88c9-4c5f-9d12-f9e9f9f8c38e',
		genomeId: '550e8400-e77b-41d4-a716-446655440066',
		postId: '',
		parentCommentId: '',
		content: 'I noticed that too. The BUSCO scores indicate a very complete genome.',
	},
	{
		id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
		authorId: '6c4f1e2a-99da-4d6f-8e13-g9f0g0g9d49f',
		genomeId: '550e8400-e77b-41d4-a716-446655440066',
		postId: '',
		parentCommentId: '',
		content:
			'The gene annotation is also impressive. Many unique metabolic pathways were identified.',
	},
	{
		id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
		authorId: '7d5g2f2b-aaeb-4e7f-9f14-h0g1h1h0e50g',
		genomeId: '550e8400-e77b-41d4-a716-446655440066',
		postId: '',
		parentCommentId: '',
		content:
			'Indeed. The repeat content analysis revealed some interesting transposable elements.',
	},
	{
		id: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
		authorId: '8e6h3g2c-bbfc-4f8f-8g15-i1h2i2i1f61h',
		genomeId: '550e8400-e77b-41d4-a716-446655440066',
		postId: '',
		parentCommentId: '',
		content:
			'Could these elements be linked to the toad’s adaptability to various environments?',
	},
	{
		id: '7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v',
		authorId: '9f7i4h2d-ccgd-4g9f-9h16-j2i3j3j2g72i',
		genomeId: '550e8400-e77b-41d4-a716-446655440066',
		postId: '',
		parentCommentId: '',
		content:
			'Possibly. The high GC content in certain regions might also play a role in genome stability.',
	},
	{
		id: '8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w',
		authorId: '0g8j5i2e-ddhe-4h0f-8i17-k3j4k4k3h83j',
		genomeId: '550e8400-e77b-41d4-a716-446655440066',
		postId: '',
		parentCommentId: '',
		content:
			'The mitochondrial genome is also well-assembled. It could provide insights into their energy metabolism.',
	},
	{
		id: '9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x',
		authorId: '1h9k6j2f-eefi-4i1f-9j18-l4k5l5l4i94k',
		genomeId: '550e8400-e77b-41d4-a716-446655440066',
		postId: '',
		parentCommentId: '',
		content:
			'I love how comprehensive this genome profile is. It’s a great resource for amphibian research.',
	},
	{
		id: '0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y',
		authorId: '2i0l7k2g-ffgj-4j2f-8k19-m5l6m6m5j05l',
		genomeId: '550e8400-e77b-41d4-a716-446655440066',
		postId: '',
		parentCommentId: '',
		content:
			'Absolutely. This could pave the way for more detailed studies on the Common Toad’s genetics.',
	},
];

const dataConvo = [
	{
		id: 'd1e2f3g4-h5i6-j7k8-l9m0-n1o2p3q4r5s6',
		authorId: '4a2d9c28-77b8-4b4f-8c11-e9d8e8e7b27d',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: '',
		content:
			'I primarily use NCBI and Ensembl for genomic data. They have comprehensive datasets.',
	},
	{
		id: 'e2f3g4h5-i6j7-k8l9-m0n1-o2p3q4r5s6t7',
		authorId: '5b3e0d29-88c9-4c5f-9d12-f9e9f9f8c38e',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: '',
		content: 'For transcriptomic data, I often rely on the SRA database. It’s quite extensive.',
	},
	{
		id: 'f3g4h5i6-j7k8-l9m0-n1o2-p3q4r5s6t7u8',
		authorId: '6c4f1e2a-99da-4d6f-8e13-g9f0g0g9d49f',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: 'e2f3g4h5-i6j7-k8l9-m0n1-o2p3q4r5s6t7',
		content: 'I agree. The SRA database is invaluable for RNA-Seq data.',
	},
	{
		id: 'g4h5i6j7-k8l9-m0n1-o2p3-q4r5s6t7u8v9',
		authorId: '7d5g2f2b-aaeb-4e7f-9f14-h0g1h1h0e50g',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: '',
		content: 'For variant data, dbSNP and ClinVar are my go-to sources.',
	},
	{
		id: 'h5i6j7k8-l9m0-n1o2-p3q4-r5s6t7u8v9w0',
		authorId: '8e6h3g2c-bbfc-4f8f-8g15-i1h2i2i1f61h',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: '',
		content: 'Does anyone use UCSC Genome Browser for data visualization?',
	},
	{
		id: 'i6j7k8l9-m0n1-o2p3-q4r5-s6t7u8v9w0x1',
		authorId: '9f7i4h2d-ccgd-4g9f-9h16-j2i3j3j2g72i',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: 'h5i6j7k8-l9m0-n1o2-p3q4-r5s6t7u8v9w0',
		content: 'Yes, UCSC Genome Browser is excellent for visualizing genomic data.',
	},
	{
		id: 'j7k8l9m0-n1o2-p3q4-r5s6-t7u8v9w0x1y2',
		authorId: '0g8j5i2e-ddhe-4h0f-8i17-k3j4k4k3h83j',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: 'h5i6j7k8-l9m0-n1o2-p3q4-r5s6t7u8v9w0',
		content: 'I also use the UCSC Genome Browser for its extensive annotation tracks.',
	},
	{
		id: 'k8l9m0n1-o2p3-q4r5-s6t7-u8v9w0x1y2z3',
		authorId: '1h9k6j2f-eefi-4i1f-9j18-l4k5l5l4i94k',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: '',
		content: 'For epigenomic data, I find the Roadmap Epigenomics Project very useful.',
	},
	{
		id: 'l9m0n1o2-p3q4-r5s6-t7u8-v9w0x1y2z3a4',
		authorId: '2i0l7k2g-ffgj-4j2f-8k19-m5l6m6m5j05l',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: '',
		content: 'I use the Roadmap Epigenomics Project too. Their data is very comprehensive.',
	},
	{
		id: 'm0n1o2p3-q4r5-s6t7-u8v9-w0x1y2z3a4b5',
		authorId: '3j1m8l2h-gghk-4k3f-9l20-n6m7n7n6k16m',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: '',
		content: 'For proteomic data, PRIDE and PeptideAtlas are my preferred sources.',
	},
	{
		id: 'n1o2p3q4-r5s6-t7u8-v9w0-x1y2z3a4b5c6',
		authorId: '4k2n9m2i-hhil-4l4f-8m21-o7n8o8o7l27n',
		genomeId: '',
		postId: 'g4b07384-d9a1-4f4b-8b0d-1e4e2d2f2f2f',
		parentCommentId: 'm0n1o2p3-q4r5-s6t7-u8v9-w0x1y2z3a4b5',
		content: 'I agree. PRIDE and PeptideAtlas have extensive proteomic datasets.',
	},
];

export default [...butterflyConvo, ...werewolfConvo, ...toadConvo, ...dataConvo];
